import { useReducer, useState, Reducer, Dispatch } from 'react'

export interface Task {
    id: string
    name: string
    createTime: string
    details?: string
}

interface QureyTaskOptions { }

export type TaskList = Task[]
export interface Action {
    type: 'add' | 'remove' | 'update',
    paylod: Task
}
const useTask = (options: QureyTaskOptions = {}): [TaskList, Dispatch<Action>] => {

    const [tasks, dispatch] = useReducer<Reducer<TaskList, Action>>((state, action) => {

        switch (action.type) {
            case 'add':
                state.push(action.paylod)
                return [...state]
            case 'remove':
                console.log('remove')
                return state
            case 'update':
                console.log('update')
                return state
            default:
                return state
        }
    }, [])


    return [tasks, dispatch]

}


export default useTask