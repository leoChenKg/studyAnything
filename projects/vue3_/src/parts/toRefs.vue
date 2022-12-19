<script setup lang="ts">
import { toRef, reactive, toRefs } from 'vue'

const obj = reactive({
  name: 'leo',
  age: 24
})
const age = toRef(obj, 'age')
console.log(age)

const newObj = reactive({
  name: 'cyx',
  age: 23
})

const refs = {
  ...toRefs(newObj)
}

const clickHandler = () => {
  // newObj.age++
  obj.age++
}
</script>

<template>
  <div>{{ newObj.age }}</div>
  <div>obj.sge{{ obj.age }}</div>
  <div>{{ age }}</div>
  <div>{{ refs.age }}</div>
  <button @click="clickHandler">click</button>
</template>
