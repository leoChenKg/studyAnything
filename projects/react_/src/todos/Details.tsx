import { FC, useEffect, useRef, useContext, useState } from 'react'
import { TaskProvider } from './TodoApp'
import { Task } from '../todos/useTask'
import styled from 'styled-components'


export interface DetailsProps {
    show: boolean,
    task?: Task,
    status: "edit" | "view"
    onClose?: () => void,
    onSave?: () => void,
    onEdit?: () => void,
}

const DetailsWrapper = styled('div') <{ show: boolean }>`
   ${(props) => `display: ${props.show ? 'block' : 'none'};`}
   padding: 16px;
   position: relative;

   .btn-con {
        position:absolute;
        top:16px;
        right:16px;
   }
`

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    /* outline: none; */
    /* border: none; */
    resize: none;
    font-size: 16px;
    font-family: inherit;
`

const Details: FC<DetailsProps> = (props) => {
    const { task, status, show, onClose, onSave, onEdit } = props
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [innerStatus, setInnerStatus] = useState<DetailsProps['status']>()

    const { dispatch } = useContext(TaskProvider)

    useEffect(() => {
        setInnerStatus(status)
    }, [status])

    useEffect(() => {
        if (innerStatus === 'edit' && inputRef.current) {
            inputRef.current.value = task!.details || ''
            inputRef.current.focus()
        }
    }, [innerStatus])


    const closeHandler = () => {
        onClose?.()
        setInnerStatus("view")
    }
    const editHandler = () => {
        onEdit?.()
        setInnerStatus("edit")
    }
    const saveHandler = () => {
        dispatch!({ type: "update", paylod: { id: task?.id!, propName: 'details', newValue: inputRef.current!.value } })
        onSave?.()
        setInnerStatus("view")
    }

    return <DetailsWrapper show={show}>
        <h3>  {task?.name}  </h3>
        {innerStatus === "edit" ? <StyledTextarea ref={inputRef} /> : task?.details}
        <div className='btn-con'>
            <button onClick={closeHandler}>close</button>
            <button onClick={editHandler}>edit</button>
            <button onClick={saveHandler} disabled={innerStatus === 'view'}>save</button>
        </div>
    </DetailsWrapper>
}

export default Details

