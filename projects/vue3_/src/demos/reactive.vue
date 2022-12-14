<script>
import { type } from 'os'
import { ref, reactive } from 'vue'

export default {
  setup() {



    const obj = reactive({ age: 24 })
    const refObj = ref({ ageRef: 10 })

    setInterval(() => {
      obj.age++
      refObj.value.ageRef++
    }, 1000)
    return {
      obj,
    }   
  }
}
</script>
<template>
  <div>reactive</div>
  <div>{{ obj.age }}</div>
</template>
