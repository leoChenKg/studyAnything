<script setup lang="ts">
import { ref } from 'vue'
import { useTasks } from './useTasks'
import customCheckBox from './checkBox.vue'

const isShowDetails = ref(false)

const tasks = useTasks()
</script>

<template>
  <div class="title"></div>
  <div class="main-con" :class="{ ' with-details': isShowDetails }">
    <div class="left-con">
      <div class="top-bar">
        <div class="check-box-con"></div>
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
        <div class="task-item-con" v-for="(task, idx) in tasks" :key="idx">
          <div class="check-box-con">
            <custom-check-box />
          </div>
          <a class="task-item-con-sub">
            <div class="name">
              <span>{{ task.name }}</span>
            </div>
            <div class="create-time">
              <span>{{ task.createTime }}</span>
            </div>
            <div class="operations"></div>
          </a>
        </div>
      </div>
      <div class="bottom-bar"></div>
    </div>
    <div class="right-con">
      <button @click="isShowDetails = false">hide</button>
    </div>
  </div>
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
    .bottom-bar {
      width: 100%;
      height: 48px;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .top-bar {
      display: flex;
      font-size: 14px;

      .check-box-con {
        flex: 0 0 32px;
        height: 100%;
        display: flex;
        align-items: center;
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
</style>
