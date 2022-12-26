<script setup lang="ts">
import { ref } from 'vue'

const isShowDetails = ref(false)
</script>

<template>
  <div class="title"></div>
  <div class="main-con" :class="isShowDetails ? 'with-details' : ''">
    <div class="left-con">
      <div class="top-bar"></div>
      <div class="tasks-con">
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
        <div class="task-item-con"></div>
      </div>
      <div class="bottom-bar"></div>
    </div>
    <div class="right-con">
      <div @click="isShowDetails = false">hide</div>
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
      // border-bottom: 1px solid #eee;
    }

    .tasks-con {
      flex: 1;
      width: 100%;
      overflow-y: auto;

      .task-item-con {
        position: relative;

        height: 48px;

        &:before {
          content: '';
          display: block;
          left: 16px;
          right: 16px;
          top: 0;
          height: 1px;
          background-color: #ddd;
          position: absolute;
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
