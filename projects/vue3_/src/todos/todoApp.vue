<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { useTasks, Task } from './useTasks'
import customCheckBox from './checkBox.vue'

const isShowDetails = ref(false)
const curHoverTask = ref<string>(undefined)
const partialChecked = ref(false)
const topChecked = ref(false)
const tasksCheckedInfo = reactive<{ [taskId: string]: boolean }>({})

const tasks = useTasks()

tasks.forEach(task => (tasksCheckedInfo[`task_${task.id}`] = task.isChecked))

// 表头 checkBox 选择状态控制
watch(tasksCheckedInfo, nV => {
  let hasCheckedFlag = 0
  for (const taskId in tasksCheckedInfo) {
    if (tasksCheckedInfo[taskId]) {
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
    for (const taskId in tasksCheckedInfo) {
      tasksCheckedInfo[taskId] = true
    }
  } else {
    partialChecked.value = false
    for (const taskId in tasksCheckedInfo) {
      tasksCheckedInfo[taskId] = false
    }
  }
}

const hoverTask = (task: Task | string, e) => {
  if (typeof task === 'string') {
    curHoverTask.value = task
  } else {
    curHoverTask.value = task.id
  }
}

const deleteTask = (task: Task, e: MouseEvent) => {
  tasks.splice(
    tasks.findIndex(item => item.id === task.id),
    1
  )
  delete tasksCheckedInfo[`task_${task.id}`]
}

const isShowAdd = ref(false)
// nextTick

const addTask = (e:MouseEvent) => {
  // e.clientX
  isShowAdd.value = true
}
</script>

<template>
  <div class="title"></div>
  <div class="main-con" :class="{ ' with-details': isShowDetails }">
    <div class="left-con">
      <div class="top-op-bar">
        <button @click="addTask">添加</button>
      </div>
      <div class="top-bar" @mouseenter="hoverTask('top', $event)">
        <div class="check-box-con">
          <custom-check-box
            v-show="partialChecked || topChecked || curHoverTask === 'top'"
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
        <div class="task-item-con" @mouseenter="hoverTask(task, $event)" v-for="(task, idx) in tasks" :key="idx">
          <div class="check-box-con">
            <custom-check-box
              v-show="partialChecked || topChecked || curHoverTask === task.id"
              v-model="tasksCheckedInfo[`task_${task.id}`]"
            />
          </div>
          <a class="task-item-con-sub">
            <div class="name">
              <span>{{ task.name }}</span>
            </div>
            <div class="create-time">
              <span>{{ task.createTime }}</span>
            </div>
            <div class="operations">
              <button @click="deleteTask(task, $event)">delte</button>
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
      </div>
      <div class="bottom-bar"></div>
    </div>
    <div class="right-con">
      <button @click="isShowDetails = false">hide</button>
    </div>
  </div>
  <div class="add-task-win" :class="{ 'win-show': isShowAdd }" v-if="isShowAdd"></div>
  <div class="mask"  v-if="isShowAdd"></div>
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

      .task-item-con {
        position: relative;
        display: flex;
        cursor: pointer;
        font-size: 14px;
        height: 48px;
        border-radius: 5px;

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
          }

          .name,
          .create-time,
          .operations {
            display: flex;
            align-items: center;
          }
        }
      }

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
  left: 1000px;
  top: 50px;
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
      left: 50%;
      top: 50%;
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
