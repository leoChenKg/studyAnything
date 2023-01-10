import { Reducer, useReducer, Dispatch, FC, createContext, useMemo, useContext, useRef, MouseEventHandler, useState, useEffect, useLayoutEffect } from "react"

interface Task {
    id: string,
    name: string,
    details: string,
    checked: boolean
}
type Tasks = Task[]
interface Action {
    type: 'update',
    paylod: Task
}
const useData = (): [Tasks, Dispatch<Action>] => {
    const [state, dispatch] = useReducer<Reducer<Tasks, Action>>((state, action) => {
        switch (action.type) {
            case "update":
                let oldTaskIndex = state.findIndex(i => i.id === action.paylod.id)
                state[oldTaskIndex] = { ...action.paylod }
                return [...state]
            default:
                return state
        }
    }, [
        {
            id: "001",
            name: 'name',
            details: 'details',
            checked: false
        }
    ])
    return [state, dispatch]
}

const TasksProvider = createContext<{ tasks: Tasks, dispatch: Dispatch<Action> } | null>(null)

interface Props {
    task: Task,
    onClick?: (task: Task) => void
}
const SubCom1: FC<Props> = (props) => {
    const { task, onClick } = props
    const { dispatch } = useContext(TasksProvider)!
    const clickHandler = () => {
        dispatch({ type: 'update', paylod: { ...task, checked: true } })
    }
    const taskClickHandler = () => {
        onClick!(task)
    }
    return <div onClick={taskClickHandler}>
        <p>{task.id}/{task.name}/{task.details}/{JSON.stringify(task.checked)}</p>
        <button onClick={clickHandler}>change task checked</button>
    </div>
}

const SubCom2: FC<Props> = (props) => {
    const { task } = props
    const { dispatch } = useContext(TasksProvider)!
    const clickHandler = () => {
        dispatch({ type: 'update', paylod: { ...task, details: 'new details......' } })
    }
    return <div style={{ border: '1px solid' }}>
        <p>SubCom2</p>
        <p>{task.id}/{task.name}/{task.details}/{JSON.stringify(task.checked)}</p>
        <button onClick={clickHandler}>change task details</button>
    </div>
}
const Demo = () => {
    const [tasks, dispatch] = useData()
    const provideData = useMemo(() => ({ tasks, dispatch }), [tasks, dispatch])
    const [curTask, setCurTask] = useState<Task>()

    useEffect(() => {
        if (curTask) {
            const targetTask = tasks.find(i => i.id === curTask.id)
            setCurTask(targetTask)
        }
    }, [tasks])

    const clickHandler: Props['onClick'] = (task) => {
        const targetTask = tasks.find(i => i.id === task.id)
        setCurTask(targetTask)
    }

    return <TasksProvider.Provider value={provideData}>
        <div>
            {tasks.map(task => <SubCom1 key={task.id} task={task} onClick={clickHandler} />)}
            <div>
                {curTask ? <SubCom2 task={curTask} /> : null}
            </div>
        </div>
    </TasksProvider.Provider>


}
export default Demo