<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Task } from './useTasks'
import customCheckBox from './checkBox.vue'

interface Props {
  task: Task
  showCheckBox?: boolean
  active?: boolean
}
interface Emits {
  (event: 'editOk', ...args: any[]): void
  (event: 'delete', ...args: any[]): void
  (event: 'edit', ...args: any[]): void
}
const props = withDefaults(defineProps<Props>(), {
  showCheckBox: false
})
const emit = defineEmits<Emits>()

const isHover = ref(false)
const inputRef = ref(null)

const editOk = () => {
  props.task.isEdit = false
  if (!props.task.name) {
    props.task.name = '新任务'
  }
  emit('editOk', props.task)
}

const deleteTask = () => {
  emit('delete', props.task)
}

const edit = () => {
  emit('edit', props.task)
}

onMounted(() => {
  if (props.task.isEdit) {
    inputRef.value.focus()
  }
})

defineExpose({
  focusCheck: () => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  },
  editOk
})

watch(
  () => props.task.isEdit,
  () => {
    console.log('isEdit')
  }
)
</script>
<template>
  <div
    class="task-item-con"
    :class="{ active, edit: props.task.isEdit }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="check-box-con" @click.stop="()=>{}">
      <custom-check-box v-show="(isHover || showCheckBox) && !task.isEdit" v-model="task.isChecked" />
    </div>
    <a class="task-item-con-sub">
      <div class="name">
        <span>{{ task.name }}</span>
        <input ref="inputRef" class="edit-name" type="text" v-model="props.task.name" />
      </div>
      <div class="create-time">
        <span>{{ task.createTime }}</span>
      </div>
      <div class="operations">
        <button class="edit-ok-btn" @click.stop="editOk">ok</button>
        <button class="delete-btn" @click.stop="deleteTask">delte</button>
        <button class="edit-btn" @click.stop="edit">edit</button>
        <button class="more-btn">
          <span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-icon="MoreOutlined"
            >
              <path
                d="M5.5 11.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm8.225 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm8.275 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </a>
  </div>
</template>
<style lang="less" scoped>
.task-item-con {
  position: relative;
  display: flex;
  cursor: pointer;
  font-size: 14px;
  height: 48px;
  border-radius: 5px;

  &.edit {
    background-color: #edeeee;

    .edit-name,
    .edit-ok-btn {
      display: inline-block !important;
    }

    .name > span,
    .delete-btn,
    .edit-btn,
    .more-btn {
      display: none !important;
    }
  }

  &.active {
    background-color: #edeeee;
  }

  &:hover {
    background-color: #edeeee;
  }
  &:last-child::after {
    content: ' ';
    position: absolute;
    display: block;
    left: 16px;
    right: 10px;
    height: 1px;
    bottom: 0;
    background-color: #ddd;
  }
  &:before {
    content: '';
    position: absolute;
    display: block;
    left: 16px;
    right: 10px;
    top: 0;
    height: 1px;
    background-color: #ddd;
  }

  .check-box-con {
    flex: 0 0 32px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-sub {
    flex: 1;
    height: 100%;
    display: flex;
    user-select: none;

    .name {
      flex: 11 1;
      height: 100%;
      color: #1f2329;
    }

    .edit-name {
      display: none;
    }

    .create-time {
      flex: 5 1;
      height: 100%;
      color: #646a73;
    }

    .operations {
      flex: 0 0 64px;
      height: 100%;
      color: #646a73;

      .more-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;

        span {
          display: inline-block;
          font-style: normal;
          line-height: 0;
          text-align: center;
          text-transform: none;
          text-rendering: optimizeLegibility;
        }
      }
      .edit-ok-btn {
        display: none;
      }
    }

    .name,
    .create-time,
    .operations {
      display: flex;
      align-items: center;
    }
  }
}
</style>
