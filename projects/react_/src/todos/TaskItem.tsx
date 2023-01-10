import { FC, MouseEventHandler, MouseEvent, useContext } from 'react'
import styled from 'styled-components'
import CheckBox, { CheckboxProps } from './CheckBox'
import { TaskProvider } from './TodoApp'
import { Task } from './useTask'

export interface TaskItemProps {
    task: Task
    active?: boolean,
    onCheckChange?: (task: Task, checked: boolean) => void,
    onClick?: (task: Task, event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => void
}

const ItemWrapper = styled('li') <{ active: boolean }>`
    width: 100%;
    height: 3.75rem;
    display: flex;
    position: relative;
    font-size: 0.875rem;
    color: #1f2329;
    cursor: pointer;
    border-radius: 8px;
    transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
   
    background: ${(props) => props.active ? '#edeeee' : ''};

    .check-box-con, .name-con, .create-time-con,.opt-con {
        display: flex;
        align-items: center;
    }

    .check-box-con {
        flex: 0 0 4rem;
        justify-content: center;
    }
    .center-con {
        flex: 1;
        display: flex;

        .name-con {
            flex: 1.5 2;
            margin-bottom: 0;
        }
        .create-time-con {
            flex: 1 3;
        }

        .name-con ,.create-time-con {
            span {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
          
        }
    }
   
    .opt-con {
        flex: 0 0 4rem;
        display: flex;
        align-items: center;
    }
    &:hover {
        background: #edeeee;
    }
    &::after {
        content: '';
        display: block;
        height: 0;
        border-bottom: 1px solid #eee;
        position: absolute;
        bottom: 0;
        left: 16px;
        right: 10px;
    }

`
const TaskItem: FC<TaskItemProps> = (props) => {
    const { task, active, onCheckChange, onClick } = props
    const { dispatch } = useContext(TaskProvider)

    const innerCheckChange: CheckboxProps['onChange'] = (checked) => {
        if (onCheckChange) {
            onCheckChange(task!, checked)
        }
        dispatch!({ type: 'update', paylod: { ...task, checked } })
    }

    const innerClick: MouseEventHandler<HTMLLIElement> = (e) => {
        if (onClick) {
            onClick(task!, e)
        }
    }

    const StopBuble: MouseEventHandler<HTMLElement> = (e) => {
        e.stopPropagation()
    }

    return <ItemWrapper onClick={innerClick} active={active!}>
        <div className="check-box-con" onClick={StopBuble}>
            <CheckBox checkStatus={task?.checked ? 'checked' : 'unchecked'} onChange={innerCheckChange} />
        </div>
        <div className='center-con'>
            <div className="name-con">
                <span>{task!.name}</span>
            </div>
            <div className="create-time-con">
                <span>2022-10-10</span>
            </div>
        </div>

        <div className="opt-con">
            <span>...</span>
        </div>
    </ItemWrapper>
}

export default TaskItem