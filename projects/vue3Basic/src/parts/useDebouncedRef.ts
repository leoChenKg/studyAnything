import { customRef, Ref } from 'vue'

export default function useDebouncedRef<T>(value: T, delay: number): Ref<T> {
  let timeout: number
  return customRef((track, trigger) => ({
    set: newValue => {
      clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    },
    get: () => {
      track()
      return value
    }
  }))
}
