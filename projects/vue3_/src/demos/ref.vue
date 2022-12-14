<script>
import { ref } from 'vue'

export default {
  setup() {
    const a = ref(10)
    const obj = ref({
      name: 'leo',
      age: 24
    })


    console.log(a, obj)

    return {
      a,
      obj
    }
  }
}
</script>
<template>
  <div>ref</div>
  <div>{{ a }}</div>
  <div>{{ obj.name }} / {{ obj.age }}</div>
  <button @click="obj.age++">click</button>
</template>
