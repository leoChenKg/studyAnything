import { reactive } from 'vue'

interface TaskQureyOptions {}
export interface Task {
  id: string
  name: string
  createTime: string
  isChecked: boolean
  isEdit: boolean
  details?: string
}
export const useTasks = (options: TaskQureyOptions = {}) => {
  const tasks = reactive<Task[]>([])
  return tasks
}
