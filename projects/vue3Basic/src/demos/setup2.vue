<script>
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    expose({
      add: (n = 1) => (count.value += n)
    })

    return () => h('div', count.value)
  },

  mounted() {
    console.log(this.count)
  }
}
</script>

<template>
  <div>setup2</div>
</template>
