<script setup lang="ts"></script>

<template>
  <div>todo</div>
  <div class="main-con">
    <div class="left-con">
      <div class="top-bar">
        <div>删除</div>
      </div>
      <div class="todos-con">
        <div class="task-item">
          <!-- 单选框 -->
          <span>〇</span>
          <!-- 图标 -->
          <span class="task-item-status">√</span>
          <span class="task-item-name">task1</span>
          <!-- 截止日期 small -->
          <div></div>
        </div>
      </div>
      <div class="bottom-bar">
        <span>总数</span>
        <span>已完成</span>
        <span>已删除</span>
      </div>
    </div>
    <div class="right-con"></div>
  </div>
</template>
<style lang="less" scoped>
.main-con {
  .left-con {
    .top-bar {
    }
    .todos-con {
      .task-item {
        &-status {
        }
        &-name {
        }
      }
    }
    .bottom-bar {
    }
  }
  .right-con {
  }
}
</style>
