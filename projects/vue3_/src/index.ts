import { createApp, ref, InjectionKey, Ref } from 'vue'
import App from './App.vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
    $sum: (a: number, b: number) => number
  }
}

const app = createApp(App)
app.use({
  install(app) {
    app.config.globalProperties = {
      $translate: (key: string) => key + '1',
      $sum: (a: number, b: number) => a + b
    }
    // app.config.globalProperties.$sum = (a: number, b: number) => a + b
  }
})
const globalCnt = ref(0)
export const key = Symbol('globalCntMsg') as InjectionKey<{
  globalCnt: Ref<number>
  addGlobalCnt: () => void
}>
app.provide(key, {
  globalCnt,
  addGlobalCnt: () => {
    globalCnt.value++
  }
})
app.mount('#app')
