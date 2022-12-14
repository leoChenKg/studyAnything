<script setup lang="ts">
import { shallowRef, triggerRef,ref ,computed} from 'vue'
const text = shallowRef({
  text: 'hello'
})



const click = () => {
  text.value.text += '1123'
//   triggerRef(text)
}



</script>
<template>
  <div>{{ text.text }}</div>
  <button @click="click">click</button>
</template>
