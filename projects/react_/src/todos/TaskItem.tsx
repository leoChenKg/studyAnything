import { FC } from 'react'
import styled from 'styled-components'
import { ReactCheckBox } from './TaskHeadNav'

interface TaskItemProps {

}

const ItemWrapper = styled.li`
    display: flex;
    width: 100%;
    height: 4rem;
    position: relative;
    font-size: 1.125rem;
    color: #1f2329;
    /* cursor: pointer; */
    
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
            /* flex: 1.5 2; */
            margin-bottom: .25rem;
        }
        .create-time-con {
            /* flex: 1 3; */
            font-size: .875rem;
            color: #aaa;
        }
    }
   
    .opt-con {
        display: none;
    }


    @media (min-width: 768px) {
        & {
            height: 3.75rem;
            font-size: 0.875rem;

            .check-box-con {
                flex: 0 0 4rem;
            }
            .opt-con {
                display: block;
                flex: 0 0 4rem;
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
const TaskItem: FC<TaskItemProps> = (props) => {

    return <ItemWrapper>
        <div className="check-box-con">
            <ReactCheckBox />
        </div>
        <div className='center-con'>
            <div className="name-con">
                <span>task1</span>
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