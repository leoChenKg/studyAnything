<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Props {
  partialChecked?: boolean
  modelValue?: boolean
}

interface EmitEvents {
  (e: 'update:modelValue', checked: boolean): void
  (e: 'change', checked: boolean): void
}

const emit = defineEmits<EmitEvents>()

const props = withDefaults(defineProps<Props>(), {
  partialChecked: false,
  modelValue: false
})

const isChecked = ref(false)
const checkChange = e => {
  const checked = e.target.checked
  isChecked.value = checked
  emit('change', checked)
  emit('update:modelValue', checked)
}
watch(
  () => props.modelValue,
  nV => {
    isChecked.value = nV
  }
)
</script>
<template>
  <label>
    <span>
      <input type="checkbox" :checked="isChecked" @change="checkChange" />
      <span class="custom-checkbox" :class="{ checked: partialChecked || isChecked }">
        <svg v-show="isChecked" :class="{ show: isChecked }" width="12" height="12" fill="none">
          <path
            d="M9.589 2.903l.808.809a.35.35 0 010 .495L5.18 9.425a.35.35 0 01-.495 0l-2.981-2.98a.35.35 0 010-.496l.808-.808a.35.35 0 01.495 0l1.925 1.925 4.163-4.163a.35.35 0 01.495 0z"
            fill="currentColor"
          ></path>
        </svg>
        <svg
          v-show="partialChecked && !isChecked"
          :class="{ show: partialChecked && !isChecked }"
          width="12"
          height="12"
          fill="none"
        >
          <path
            d="M2 5.4c0-.22.18-.4.4-.4h7.2c.22 0 .4.18.4.4v1.2a.4.4 0 01-.4.4H2.4a.4.4 0 01-.4-.4V5.4z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    </span>
  </label>
</template>
<style lang="less" scoped>
label {
  line-height: 18px;
  cursor: pointer;
  & > span {
    display: inline-block;
    position: relative;
    width: 14px;
  }
}

[type='checkbox'] {
  position: relative;
  opacity: 0;
}

.custom-checkbox {
  display: block;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 14px;
  border-radius: 4px;
  border: 1px solid #aaa;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    border-color: #3370ff;
  }
  &.checked {
    background: #3370ff;
    border-color: #3370ff;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;

    &.show {
      animation: show-svg 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    @keyframes show-svg {
      0% {
        transform: translate(-50%, -50%) scale(1);
      }

      50% {
        transform: translate(-50%, -50%) scale(1.2);
      }

      100% {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}
</style>
