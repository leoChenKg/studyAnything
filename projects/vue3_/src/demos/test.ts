import { onMounted, ref, Ref } from 'vue'

export default function useFn(): void {
  onMounted(() => {
    console.log(' useFn setup 之外的生命周期函数！！！！！！！！！！！！！！！！！！！！！！！！！')
  })
}

export const useFetch = () => {
  const data = ref<{ [propName: string]: any } | null>(null)
  const error = ref<{ message: string } | null>(null)

  setTimeout(() => {
    data.value = {
      name: 'leo',
      age: 80
    }
  }, 5000)

  return {
    data,
    error
  }
}
