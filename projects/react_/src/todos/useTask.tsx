import { useReducer, useState, Reducer, Dispatch, useCallback } from 'react'

export interface Task {
    id: string
    name: string
    createTime: string
    details?: string,
    checked?: boolean,
    active?: boolean
}

interface QureyTaskOptions { }

export type TaskList = Task[]

export type Action = {
    type: 'add' | 'remove' | 'update',
    paylod: Task
} | {
    type: 'checkAll' | 'unCheckAll',
}
const useTask = (options: QureyTaskOptions = {}): [TaskList, Dispatch<Action>] => {

    const [tasks, dispatch] = useReducer<Reducer<TaskList, Action>>((state, action) => {

        switch (action.type) {
            case 'add':
                state.push(action.paylod)
                return [...state]
            case 'remove':
                return state
            case 'update':
                const oldTaskIndex = state.findIndex(item => item.id == action.paylod.id)
                state[oldTaskIndex] = action.paylod
                return [...state]
            case "checkAll":
                return state.map((task) => task.checked ? task : ({ ...task, checked: true }))
            case 'unCheckAll':
                return state.map((task) => task.checked ? { ...task, checked: false } : task)
            default:
                return state
        }
    }, [{
        id: '1',
        name: '任务一',
        createTime: '2023-01-05',
        checked: false
    }, {
        id: '2',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '3',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '4',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '5',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '6',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '7',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '8',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false

    },
    {
        id: '9',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '10',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '11',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '12',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '13',
        name: 'task2',
        createTime: '2023-01-05'
        , checked: false
    },
    {
        id: '14',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '15',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '16',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '17',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '18',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    {
        id: '19',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    },
    ])

    // const wrappedDispatch = useCallback((action: Action) => {
    //     dispatch(action)

    // }, [tasks])
    return [tasks, dispatch]

}

export default useTask