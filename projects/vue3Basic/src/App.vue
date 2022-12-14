<script setup lang="ts">
import { types } from '@babel/core'
import { ref, onMounted } from 'vue'
import setupVue from './demos/setup.vue'
import setup2Vue from './demos/setup2.vue'
import refVue from './demos/ref.vue'
import computedVue from './demos/computed.vue'
import reactiveVue from './demos/reactive.vue'
import watchEffectVue from './demos/watchEffect.vue'

// const setup2VueRef = ref<{ add: (n: number | undefined) => void }>()

// onMounted(() => {
//   console.log(setup2VueRef.value?.add(10))
// })

// const clickHandler = () => {
//   console.log('click ahahahah!!')
// }
</script>
<template>
  <div>
    <!-- <setupVue @click="clickHandler" :defaultCount="100">
      <template v-slot:name1> <div>slot name1</div></template>
    </setupVue>
    <setup2Vue ref="setup2VueRef" /> -->
    <!-- <refVue/> -->
    <!-- <computedVue/> -->
    <!-- <reactiveVue/> -->
    <watchEffectVue />
  </div>
</template>
