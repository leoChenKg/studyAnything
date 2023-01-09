import { useContext } from 'react'
import { TaskProvider } from './TodoApp'

const useDetails = (options: { taskId: string }): string => {
  const { tasks } = useContext(TaskProvider)
  if (tasks) {
    const targetTask = tasks.find(task => task.id === options.taskId)
    return targetTask?.details || ''
  } else {
    return ''
  }
}

export default useDetails
