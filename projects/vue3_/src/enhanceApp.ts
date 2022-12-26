import { App, Ref, ref, InjectionKey } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
    $sum: (a: number, b: number) => number
    $sub: (a: number, b: number) => number
  }
}

export const key = Symbol('globalCntMsg') as InjectionKey<{
  globalCnt: Ref<number>
  addGlobalCnt: () => void
}>

export default function <T>(app: App<T>): App<T> {
  app.config.globalProperties = {
    $translate: (key: string) => key + '1',
    $sum: (a: number, b: number) => a + b,
    $sub: (a: number, b: number) => a - b
  }

  const globalCnt = ref(0)
  app.provide(key, {
    globalCnt,
    addGlobalCnt: () => {
      globalCnt.value++
    }
  })
  return app
}
