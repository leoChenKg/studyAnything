import { FC, useEffect, useRef, Dispatch, useContext, useState, FormEventHandler, useCallback } from 'react'
import useDetails from './useDetails'
import { Action } from './useTask'
import { TaskProvider } from './TodoApp'


interface Props {
    status?: "edit" | "view"
    taskId?: string,
    close?: () => void,
    save?: (value: string) => void,
    dispatch: Dispatch<Action>
}



const debounce = (fn: Function, delay: number) => {
    let timer: number
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
const Details: FC<Props> = (props) => {
    const { taskId, status } = props
    const { tasks, dispatch } = useContext(TaskProvider)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const details = useDetails({ taskId: taskId as string })

    const [innerStatus, setInnerStatus] = useState<Props['status']>()

    useEffect(() => {
        setInnerStatus(status)
    }, [status])

    const curTask = tasks?.find(item => item.id === taskId)

    useEffect(() => {
        setInnerStatus("view")
    }, [taskId])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = details ? details : ''
            if (innerStatus === 'edit') {
                inputRef.current.focus()
            }
        }
    }, [taskId, innerStatus])

    const closeHandler = () => {
        if (props.close) {
            props.close()
        }
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        setInnerStatus("view")
    }

    const saveHandler = () => {
        if (props.save)
            props.save(inputRef.current!.value)
        dispatch!({ type: "update", paylod: { ...curTask!, details: inputRef.current!.value } })
        setInnerStatus("view")
    }

    const editHandler = () => {
        setInnerStatus("edit")
    }

    const nameChange = useCallback(debounce((e: any) => {
        console.log('执行----', e.target.innerHTML)
        dispatch!({ type: "update", paylod: { ...curTask!, name: (e.target as HTMLDivElement).innerHTML } })
    }, 1000), [curTask])



    return <article>
        {innerStatus === "edit" ? <div suppressContentEditableWarning contentEditable={true} onInput={nameChange}> {curTask?.name}  </div> : <h3>  {curTask?.name}  </h3>}

        {innerStatus === "edit" ? <textarea ref={inputRef} ></textarea> : details}
        <div>
            <button onClick={closeHandler}>close</button>
            <button onClick={editHandler}>edit</button>
            <button onClick={saveHandler}>save</button>
        </div>

    </article>
}

export default Details

