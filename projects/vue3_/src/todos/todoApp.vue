<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { useTasks, Task } from './useTasks'
import customCheckBox from './checkBox.vue'
import taskItem from './taskItem.vue'

const isShowDetails = ref(false)
const isAdding = ref(false)
const hoverTop = ref(false)
const partialChecked = ref(false)
const topChecked = ref(false)
const curTask = ref<Task>(undefined)
const tasks = useTasks()

const curInstance = getCurrentInstance()
// 表头 checkBox 选择状态控制
watch(tasks, nV => {
  let hasCheckedFlag = 0
  for (const task of tasks) {
    if (task.isChecked) {
      hasCheckedFlag++
    }
  }

  if (hasCheckedFlag < tasks.length && hasCheckedFlag > 0) {
    partialChecked.value = true
    topChecked.value = false
  } else {
    partialChecked.value = false
    if (hasCheckedFlag === tasks.length) {
      topChecked.value = true
    }
  }
})

const topCheckChange = checked => {
  if (checked) {
    partialChecked.value = false
    for (const task of tasks) {
      task.isChecked = true
    }
  } else {
    partialChecked.value = false
    for (const task of tasks) {
      task.isChecked = false
    }
  }
}

const addTask = e => {
  if (isAdding.value) {
    const { refs } = curInstance
    ;(refs[`taskRef_${tasks[0].id}`] as any[])[0].focusCheck()
    return
  }
  const newTask = {
    id: Math.random().toFixed(2) + 'id',
    isChecked: false,
    isEdit: true,
    createTime: '2022-12-30',
    name: undefined
  }
  tasks.unshift(newTask)
  curTask.value = newTask
  isAdding.value = true
  isShowDetails.value = true
}

const edit = (task: Task) => {
  task.isEdit = true
}
const editOk = (task: Task) => {
  isAdding.value = false
}

const deleteTask = (task: Task) => {
  tasks.splice(
    tasks.findIndex(item => item.id === task.id),
    1
  )
}

const taskClick = (task: Task) => {
  if (task.id === curTask.value.id) return
  // 关闭编辑状态
  if (curTask.value && curTask.value.isEdit) {
    const { refs } = curInstance
    ;(refs[`taskRef_${curTask.value.id}`] as any)[0]?.editOk()
    curTask.value.isEdit = false
    isAdding.value = false
  }

  isShowDetails.value = true
  curTask.value = task
}
</script>

<template>
  <div class="title"></div>
  <div class="main-con" :class="{ 'with-details': isShowDetails }">
    <div class="left-con">
      <div class="top-op-bar">
        <button @click="addTask">添加</button>
      </div>
      <div class="top-bar" @mouseenter="hoverTop = true" @mouseleave="hoverTop = false">
        <div class="check-box-con">
          <custom-check-box
            v-show="partialChecked || topChecked || hoverTop"
            :partial-checked="partialChecked"
            v-model="topChecked"
            @change="topCheckChange"
          />
        </div>
        <a class="task-item-con-sub">
          <div class="name">
            <span>名称</span>
          </div>
          <div class="create-time">
            <span>创建时间</span>
          </div>
          <div class="operations"></div>
        </a>
      </div>
      <div class="tasks-con">
        <task-item
          v-for="(task, idx) in tasks"
          :active="curTask.id === task.id"
          :ref="`taskRef_${task.id}`"
          :task="task"
          :show-check-box="partialChecked || topChecked"
          :key="task.id"
          @edit="edit"
          @edit-ok="editOk"
          @delete="deleteTask"
          @click.native="taskClick(task)"
        />
        <p v-if="!tasks.length" style="text-align: center; font-size: 12px; color: #aaa; border-top: 1px solid #ccc">
          暂无数据
        </p>
      </div>
      <div class="bottom-bar"></div>
    </div>
    <div class="right-con">
      <button @click="isShowDetails = false">hide</button>
      <textarea v-if="curTask && curTask.isEdit" v-model="curTask.details"></textarea>
      <span v-if="curTask && !curTask.isEdit">{{ curTask.details }}</span>
    </div>
  </div>
  <!-- <div class="add-task-win" :class="{ 'win-show': isShowAdd }" v-if="isShowAdd">
  </div>
  <div class="mask" v-if="isShowAdd"></div> -->
</template>
<style lang="less" scoped>
.title {
  height: 64px;
  box-sizing: border-box;
  border: 1px solid #eee;
}
.main-con {
  height: calc(100% - 64px);
  display: flex;
  box-sizing: border-box;

  .left-con {
    // padding: 0 16px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    .top-bar,
    .bottom-bar,
    .top-op-bar {
      width: 100%;
      height: 48px;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .top-op-bar {
      display: flex;
      align-items: center;

      button {
        margin-left: 38px;
      }
    }
    .top-bar {
      box-sizing: border-box;
      padding: 0 12px 0 6px;
      display: flex;
      font-size: 14px;

      .check-box-con {
        flex: 0 0 32px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .task-item-con-sub {
        flex: 1;
        height: 100%;
        display: flex;
        user-select: none;

        .name {
          flex: 11 1;
          height: 100%;
        }

        .create-time {
          flex: 5 1;
          height: 100%;
        }

        .operations {
          flex: 0 0 64px;
          height: 100%;
        }

        .name,
        .create-time,
        .operations {
          display: flex;
          align-items: center;
          color: #646a73;
        }
      }
    }

    .tasks-con {
      box-sizing: border-box;
      padding: 0 6px;
      flex: 1;
      width: 100%;
      overflow-y: auto;
      // padding: 0 6px 0 6px;

      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #ccc;
        display: none;
      }

      &:hover {
        &::-webkit-scrollbar-track {
          display: block;
        }
        &::-webkit-scrollbar-thumb {
          display: block;
        }
      }
    }

    .bottom-bar {
      // border-top: 1px solid #eee;
    }
  }
  .right-con {
    width: 0%;
    height: 100%;
    overflow: hidden auto;
    // 改变width添加动画 will-change 提高性能
    will-change: width;
    border-left: 1px solid #eee;
    box-sizing: border-box;
    transition: width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &.with-details {
    .left-con {
      width: 50% !important;
    }
    .right-con {
      width: 50% !important;
    }
  }
}

.add-task-win {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 99;

  &.win-show {
    animation: winShow 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
  }

  @keyframes winShow {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      // left: 50%;
      // top: 50%;
    }
  }
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.14);
}
</style>
