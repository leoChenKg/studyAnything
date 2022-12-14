<script lang="ts">
import { ref, defineProps } from 'vue'
import useFn from './test'
console.log('非 setup script 执行')

const a = ref(10)
const b = ref(11)
const changeA = () => {
  a.value++
}
const changeB = () => {
  b.value++
}

// import 后就可以得到
export default {
  // inheritAttrs:false
  test: 'test',
  fun() {}
}
</script>
<script setup lang="ts">
import { onMounted, getCurrentInstance, useAttrs, inject, onUpdated } from 'vue'
import { key } from '../index'
import { useFetch } from './test'
const attrs = useAttrs()
console.log('script setup 执行')

useFn()
const { globalCnt, addGlobalCnt } = inject(key)!
onUpdated(() => {
  console.log('onUpdated')
})
onMounted(() => {
  const res = getCurrentInstance()
  console.log('mounted 执行')
})
const { data: fecthData, error } = useFetch()
/**
 * Typescript 类型声明
 */
const props = defineProps<{
  foo: number
}>()

const emit = defineEmits<{
  (e: 'change', m: number | undefined): void
}>()

const handler = () => {
  emit('change', 2)
}

const data = ref<{
  name: string
  age: number
} | null>(null)

const changePersonMsg = () => {
  const targetMsg = {
    name: 'cyx',
    age: 26
  }
  data.value = targetMsg
}

setTimeout(() => {
  data.value = {
    name: 'lep',
    age: 24
  }
}, 3000)

defineExpose({
  a,
  changeA,
  b,
  changeB
})
</script>

<template>
  <div>
    <div>----</div>
    <div>{{ globalCnt }}</div>
    <div>{{ foo }}</div>
    <div>{{ a }}</div>
    <div>{{ b }}</div>
    <div>-----个人信息---</div>
    <div v-if="data">
      <span>姓名：{{ data.name }}</span>
      <span>年龄：{{ data.age }}</span>
    </div>
    <div v-else>加载中...</div>
    ------------------------
    <div>fetch数据</div>
    <div v-if="fecthData">
      <span>姓名：{{ fecthData.name }}</span>
      <span>年龄：{{ fecthData.age }}</span>
    </div>
    <div v-else>fetching...</div>
    <button @click="handler">click</button>
    <button @click="changeA">changeA</button>
    <button @click="changeB">changeB</button>
    <button @click="addGlobalCnt">addGlobalCnt</button>
    <button @click="changePersonMsg">changePersonMsg</button>
  </div>
</template>
<style scoped></style>
