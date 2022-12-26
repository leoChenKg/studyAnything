<script setup lang="ts">
import { ref, onMounted, Directive, inject, getCurrentInstance, ComponentInternalInstance } from 'vue'
import setupVue from './demos/setup.vue'
import setup2Vue from './demos/setup2.vue'
import setup3Vue from './demos/setup3.vue'
import refVue from './demos/ref.vue'
import computedVue from './demos/computed.vue'
import reactiveVue from './demos/reactive.vue'
import watchEffectVue from './demos/watchEffect.vue'
import toRefsDemo from './parts/toRefs.vue'
import triggerRefVue from './parts/triggerRef.vue'
import { key } from './index'
const setup2VueRef = ref<{ add: (n: number | undefined) => void }>()
const { globalCnt } = inject(key)!
// onMounted(() => {
//   console.log(setup2VueRef.value?.add(10))
// })

const clickHandler = () => {
  console.log('click ahahahah!!')
}
// 指令使用 满足命名规范 vNameDirective v开头 小驼峰规则
const vMy: Directive = {
  beforeMount: (el: HTMLElement, bindgs, vnode) => {
    // 在元素上做些操作
    console.log('vMyDirective 指令', el)
  }
}

const foo = ref(0)
const fooChange = (n: number | undefined) => {
  n ? (foo.value += n) : foo.value++
}
const setup3VueRef = ref(null)

onMounted(() => {
  console.log(setup3VueRef.value, setup3Vue)
})

const clickTest = () => {
  console.log('clickTest')
}

// const { proxy } = getCurrentInstance() as ComponentInternalInstance
// console.log()
</script>
<template>
  <div v-my>
    <div>{{ globalCnt }}</div>
    ------------------------
    <setupVue @click="clickHandler" :defaultCount="100">
      <template v-slot:name1> <div>slot name1</div></template>
    </setupVue>
    <!-- <setup2Vue ref="setup2VueRef" /> -->
    <!-- 透传属性 -->
    <setup3Vue
      :foo="foo"
      @change="fooChange"
      ref="setup3VueRef"
      a="mm"
      b="cc"
      class="test"
      style="color: red"
      @click="clickTest"
    />
    <!-- <refVue/> -->
    <!-- <computedVue/> -->
    <!-- <reactiveVue/> -->
    <!-- <watchEffectVue /> -->
    ------------------------
    <toRefsDemo />
    ------------------------
    <triggerRefVue />
  </div>
</template>
