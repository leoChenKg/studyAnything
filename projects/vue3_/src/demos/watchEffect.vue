<script>
import { ref, reactive, watchEffect } from 'vue'

export default {
  setup() {
    const count = ref(10)

    watchEffect(OnCleanup => {
      OnCleanup(() => {
        console.log('清除')
      })
      console.log(count.value)
    })
    return {
      count
    }
  }
}
</script>
<template>
  <div>watchEffectVue</div>
  <div>{{ count }}</div>
  <button @click="count++">click</button>
</template>
