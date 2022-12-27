import { reactive } from 'vue'

interface TaskQureyOptions {

}
export const useTasks = (options: TaskQureyOptions = {}) => {
  const tasks = reactive([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])

  return tasks
}
