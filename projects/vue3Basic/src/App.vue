<script setup lang="ts">
import useDebouncedRef from './parts/useDebouncedRef'
import toRefsVue from './parts/toRefs.vue'
import triggerRefVue from './parts/triggerRef.vue'

let text = useDebouncedRef('', 200)
</script>
<template>
  <div>
    <!-- <toRefsVue/> -->
    <triggerRefVue />
    <div>{{text}}</div>
    <input v-model="text" />
  </div>
</template>
