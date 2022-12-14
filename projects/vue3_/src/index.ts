import { createApp, ref, InjectionKey, Ref } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use({
  install(app) {
    app.config.globalProperties.$translate = (key: string) => key + '1'
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
