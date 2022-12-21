<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(10)
    const afterCnt = ref(100)

    const computedCnt = computed(
      {
        get: () => {
          return count.value + afterCnt.value
        },
        set: v => {
          afterCnt.value = v
        }
      },
      {
        onTrack(e) {
          debugger
        },
        onTrigger(e) {
          debugger
        }
      }
    )

    return {
      computedCnt,
      change: () => {
        computedCnt.value = afterCnt.value + 1
      }
    }
  }
}
</script>
<template>
  <div class="x">computed</div>
  <div>{{ computedCnt }}</div>
  <button @click="change">click</button>
</template>
