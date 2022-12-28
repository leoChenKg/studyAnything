import { reactive } from 'vue'

interface TaskQureyOptions {}
interface Task {
  name: string
  createTime: string
}
export const useTasks = (options: TaskQureyOptions = {}) => {
  const tasks = reactive<Task[]>([
    {
      name: '任务一',
      createTime: '2022-10-12'
    },
    {
      name: 'task2',
      createTime: '2022-10-12'
    },
    {
      name: 'task3',
      createTime: '2022-10-12'
    },
    {
      name: 'task4',
      createTime: '2022-10-12'
    },
    {
      name: 'task5',
      createTime: '2022-10-12'
    },
    {
      name: 'task6',
      createTime: '2022-10-12'
    },
    {
      name: 'task7',
      createTime: '2022-10-12'
    },
    {
      name: 'task8',
      createTime: '2022-10-12'
    },
    {
      name: 'task9',
      createTime: '2022-10-12'
    },
    {
      name: 'task10',
      createTime: '2022-10-12'
    },
    {
      name: 'task11',
      createTime: '2022-10-12'
    },
    {
      name: 'task12',
      createTime: '2022-10-12'
    },
    {
      name: 'task13',
      createTime: '2022-10-12'
    },
    {
      name: 'task14',
      createTime: '2022-10-12'
    },
    {
      name: 'task15',
      createTime: '2022-10-12'
    },
    {
      name: 'task16',
      createTime: '2022-10-12'
    },
    {
      name: 'task17',
      createTime: '2022-10-12'
    },
    {
      name: 'task18',
      createTime: '2022-10-12'
    },
    {
      name: 'task19',
      createTime: '2022-10-12'
    }
  ])

  return tasks
}
