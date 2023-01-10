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

interface ActionPayload<T extends keyof Task> {
    id: string,
    propName: T,
    newValue: Task[T]
}

interface UpdateAction {
    type: "update",
    paylod: ActionPayload<'active'> | ActionPayload<"checked"> | ActionPayload<"createTime"> | ActionPayload<"details"> | ActionPayload<"name">
}

export type Action = {
    type: 'add',
    paylod: Task
} | {
    type: 'checkAll' | 'unCheckAll',
} | {
    type: 'remove', paylod: string | string[]
} | UpdateAction
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
                const { propName, newValue, id } = action.paylod
                const oldTaskIndex = state.findIndex(item => item.id === id)
                state[oldTaskIndex] = { ...state[oldTaskIndex], [propName]: newValue }
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
        console.log(action, tasks)
        dispatch(action)
    }, [tasks])
    return [tasks, wrappedDispatch]

}

export default useTask






interface A {
    prop1: string,
    prop2: boolean,
    prop3: number,
    prop4: string[],
    prop5: () => void,
    prop6: null,
    prop7: undefined,
    prop8: any,
}

/**
 *  实现一个 B类型 
 *  B 类型 有两个字段 propName、propValue ，  
 *  其中 propName 取值类型是 A 类的 key 值（keyof A）。
 *  propValue 的取值类型是根据 propName 的取值对应的  A[propName] 类型。
 *  propValue 的类型根据 propName 的取值决定
 *  比如 对象 b 是 B 类型
 *      如果 b.propName 值是 'prop1' ，那么 b.propValue 的取值类型就只能是 string
 *      如果 b.propName 值是 'prop2' ，那么 b.propValue 的取值类型就只能 boolean
 *      如果 b.propName 值是 'prop3' ，那么 b.propValue 的取值类型就只能 number
 *      ....
 */
