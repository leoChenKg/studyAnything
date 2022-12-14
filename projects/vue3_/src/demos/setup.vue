<script>
import { ref } from 'vue'

export default {
  props: {
    defaultCount: String
  },
  setup(props, context) {
    const count = ref(props.defaultCount)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count,
      add() {
        context.emit('click')
        this.count++
      }
    }
  },

  mounted() {
    console.log(this.count)
  }
}
</script>

<template>
  <div>{{ defaultCount }}</div>
  <button @click="add">{{ count }}</button>
  <div>
    <slot name="name1"></slot>
  </div>
</template>
