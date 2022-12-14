<script>
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    console.log('setup 执行')
    const count = ref(0)
    expose({
      add: (n = 1) => (count.value += n)
    })

    // return () => h('div', count.value)
    return {
      count
    }
  },

  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
    console.log(this.count)
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  }
}
</script>

<template>
  <div>setup2</div>
  <div>{{ count }}</div>
  <button @click="count++">click</button>
</template>
