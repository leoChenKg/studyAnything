import { FC, useEffect, Dispatch, MouseEventHandler, MouseEvent } from 'react'
import styled from 'styled-components'
import { CheckboxProps } from './CheckBox'
import { ReactCheckBox } from './TaskHeadNav'
import { Task, Action } from './useTask'

export interface TaskItemProps {
    task: Task
    active: boolean,
    checkChange: (task: Task, checked: boolean) => void,
    dispatch: Dispatch<Action>
    onClick: (task: Task, event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => void
}

const ItemWrapper = styled('li') <{ active: boolean }>`
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    font-size: 1rem;
    color: #1f2329;
    cursor: pointer;
    border-radius: 8px;
    transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-left: 16px;

   // TODO handler active
   
   background: ${(props) => props.active ? '#edeeee' : ''};

    .check-box-con, .name-con, .create-time-con,.opt-con {
        display: flex;
        align-items: center;
    }

    .check-box-con {
        flex: 0 0 3rem;
        justify-content: center;
    }
    .center-con {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .name-con {
        }
        .create-time-con {
            font-size: .875rem;
            color: #aaa;
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
        display: none;
    }

    // 只有支持 hover 的设备才进行 hover 
    @media (any-hover:hover) { 
        &:hover {
            background-color:#edeeee ;
        }
    }
    

    @media (min-width: 768px) {
        & {
            padding-left: 0;
            flex-direction: row;
            height: 3.75rem;
            font-size: 0.875rem;

            .check-box-con {
                flex: 0 0 4rem;
            }
            .opt-con {
                flex: 0 0 4rem;
                display: flex;
                align-items: center;
                
            }

            .center-con {
                flex: 1;
                display: flex;
                flex-direction: row;

                .name-con {
                    flex: 1.5 2;
                    margin-bottom: 0;
                }
                .create-time-con {
                    flex: 1 3;
                    font-size: inherit;
                    color: inherit;
                }
            }
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

      
    }

`
const TaskItem: FC<Partial<TaskItemProps>> = (props) => {
    const { task, active, checkChange, dispatch, onClick } = props

    const innerCheckChange: CheckboxProps['onChange'] = (checked) => {
        if (dispatch) {
            dispatch({
                type: "update",
                paylod: { ...task!, checked }
            })
        }
        if (checkChange) {
            checkChange(task!, checked)
        }
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
            <ReactCheckBox checkStatus={task?.checked ? 'checked' : 'unchecked'} onChange={innerCheckChange} />
        </div>
        <div className='center-con'>
            <div className="name-con">
                <span>{task!.name}</span>
            </div>
            <div className="create-time-con">
                <span>最后更新于 2022-10-10</span>
            </div>
        </div>

        <div className="opt-con">
            <span>...</span>
        </div>
    </ItemWrapper>
}

export default TaskItem