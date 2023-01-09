import { FC, useEffect, useRef, Dispatch, useContext } from 'react'
import useDetails from './useDetails'
import { Action } from './useTask'
import { TaskProvider } from './TodoApp'


interface Props {
    taskId?: string,
    close?: () => void,
    save?: (value: string) => void,
    dispatch: Dispatch<Action>
}

const Details: FC<Props> = (props) => {
    const { tasks, dispatch } = useContext(TaskProvider)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const { taskId } = props
    const details = useDetails({ taskId: taskId as string })

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = details ? details : ''
        }
    }, [details])

    const closeHandler = () => {
        if (props.close)
            props.close()
    }

    const saveHandler = () => {
        if (props.save)
            props.save(inputRef.current!.value)
        const curTask = tasks?.find(item => item.id === taskId)
        dispatch!({ type: "update", paylod: { ...curTask!, details: inputRef.current!.value } })
    }

    return <article>
        <textarea ref={inputRef} ></textarea>
        <button onClick={closeHandler}>close</button>
        <button onClick={saveHandler}>save</button>
    </article>
}

export default Details