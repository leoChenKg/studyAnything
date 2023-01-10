import { useReducer, Reducer, Dispatch, useCallback } from 'react'

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
    type: 'add' | 'update',
    paylod: Task
} | {
    type: 'checkAll' | 'unCheckAll',
} | {
    type: 'remove', paylod: string | string[]
}
const useTask = (options: QureyTaskOptions = {}): [TaskList, Dispatch<Action>] => {

    const [tasks, dispatch] = useReducer<Reducer<TaskList, Action>>((state, action) => {

        switch (action.type) {
            case 'add':
                state.unshift(action.paylod)
                return [...state]
            case 'remove':
                if (typeof action.paylod === 'string') {
                    state.splice(state.findIndex(item => item.id === action.paylod), 1)
                } else {
                    action.paylod.forEach((taskId) => {
                        state.splice(state.findIndex(item => item.id === taskId), 1)
                    })
                }
                return [...state]
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
        checked: false,
        details: '任务一详细内容'
    }, {
        id: '2',
        name: 'task2',
        createTime: '2023-01-05',
        checked: false
    }
    ])

    const wrappedDispatch = useCallback((action: Action) => {
        console.log(action , tasks)
        dispatch(action)
    }, [tasks])
    return [tasks, wrappedDispatch]

}

export default useTask