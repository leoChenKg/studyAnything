<script setup lang="ts">
import { ref, defineEmits, defineProps, withDefaults, watch } from 'vue'

const isChecked = ref(false)

const emit = defineEmits<{
  (e: 'input', event: any): void
  (e: 'change', event: any): void
}>()

interface Props {
  value?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: false
})

const checkChange = e => {
  isChecked.value = e.target.checked
  emit('input', { ...e, checked: isChecked.value })
  emit('change', { ...e, checked: isChecked.value })
}

watch(
  () => props.value,
  nV => {
    isChecked.value = nV
  }
)
</script>
<template>
  <label>
    <span>
      <input type="checkbox" :value="isChecked" @change="checkChange" />
      <span class="custom-checkbox">
        <svg width="12" height="12" fill="none" class="ud__checkbox__checked-svg">
          <path
            d="M9.589 2.903l.808.809a.35.35 0 010 .495L5.18 9.425a.35.35 0 01-.495 0l-2.981-2.98a.35.35 0 010-.496l.808-.808a.35.35 0 01.495 0l1.925 1.925 4.163-4.163a.35.35 0 01.495 0z"
            fill="currentColor"
          ></path>
        </svg>
        <svg width="12" height="12" fill="none" class="ud__checkbox__indeterminate-svg">
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
  & > span {
    position: relative;
  }
}

[type='checkbox'] {
  position: relative;
  opacity: 0;
}

.custom-checkbox {
  left: 0;
  bottom: .5px;
  position: absolute;
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid;
}
</style>
