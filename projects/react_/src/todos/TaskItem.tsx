import { FC } from 'react'
import styled from 'styled-components'
import { CheckboxProps } from './CheckBox'
import { ReactCheckBox } from './TaskHeadNav'
import { Task } from './useTask'

export interface TaskItemProps {
    task: Task
    checkChange: (task: Task, checked: boolean) => void
}

const ItemWrapper = styled.li`
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    font-size: 1rem;
    color: #1f2329;
    cursor: pointer;
    
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


    @media (min-width: 768px) {
        & {
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
                /* justify-content: center; */

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
            width: 100%;
            height: 0;
            border-bottom: 1px solid #eee;
            position: absolute;
            bottom: 0;
        }

      
    }

`
const TaskItem: FC<Partial<TaskItemProps>> = (props) => {
    const { task, checkChange } = props

    const innerCheckChange: CheckboxProps['onChange'] = (checked) => {
        if (checkChange) {
            checkChange(task!, checked)
        }
    }

    return <ItemWrapper>
        <div className="check-box-con">
            <ReactCheckBox onChange={innerCheckChange} />
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