import { reactive } from 'vue'

interface TaskQureyOptions {}
export interface Task {
  id: string
  name: string
  createTime: string
  isChecked: boolean
}
export const useTasks = (options: TaskQureyOptions = {}) => {
  const tasks = reactive<Task[]>([
    {
      id: '1',
      name: '任务一',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '2',
      name: 'task2',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '3',
      name: 'task3',
      createTime: '2022-10-12',
      isChecked: false
    },
    { id: '4', name: 'task4', createTime: '2022-10-12', isChecked: false },
    {
      id: '5',
      name: 'task5',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '6',
      name: 'task6',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '7',
      name: 'task7',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '8',
      name: 'task8',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '9',
      name: 'task9',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '10',
      name: 'task10',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '11',
      name: 'task11',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '12',
      name: 'task12',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '13',
      name: 'task13',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '14',
      name: 'task14',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '15',
      name: 'task15',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '16',
      name: 'task16',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '17',
      name: 'task17',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '18',
      name: 'task18',
      createTime: '2022-10-12',
      isChecked: false
    },
    {
      id: '19',
      name: 'task19',
      createTime: '2022-10-12',
      isChecked: false
    }
  ])

  return tasks
}
