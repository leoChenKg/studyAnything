import { useEffect, useState, createContext, Dispatch, useMemo } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./globalStyle";
import TaskHeadNav from './TaskHeadNav'
import TaskItem, { TaskItemProps } from "./TaskItem";
import useTask, { Action, Task } from "./useTask";
import { CheckStatus } from "./CheckBox";
import Details, { DetailsProps } from "./Details";



const App = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: LarkHackSafariFont,LarkEmojiFont,LarkChineseQuote,-apple-system,BlinkMacSystemFont,Helvetica Neue,Arial,Segoe UI,PingFang SC,Microsoft Yahei,Hiragino Sans GB,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;

`

const HeadNav = styled.div`
    flex: 0 0 4rem;
    border-bottom: 1px solid #eee;
`

const Main = styled.main`
    display: flex;
    height: calc(100% - 128px) ;
    
   
    article {
        width: 50%;
    }

    aside {
        width: 50%;
    }
`

const Footer = styled.div`
    flex: 0 0 4rem;
    border-top: 1px solid #eee;
`
const NoDataWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        color: #aaa;
        font-size: 0.875rem;
    }
`
const NoData = () => {
    return <NoDataWrapper> <p>暂无数据</p></NoDataWrapper>
}
declare global {
    interface Window {
        tasks: any;
    }
}


export const TaskProvider = createContext<{ tasks?: Task[], dispatch?: Dispatch<Action> }>({})

const TodoApp = () => {
    const [activedTask, setActivedTask] = useState<Task>()
    const [tasks, dispatch] = useTask()
    window.tasks = tasks
    const provideData = useMemo(() => ({ tasks, dispatch }), [tasks, dispatch])

    const [rootCheckStatus, setRootCheckStatus] = useState<CheckStatus>()
    const [detailsStatus, setDetailsStatus] = useState<DetailsProps['status']>("view")

    useEffect(() => {
        if (activedTask) {
            setActivedTask(tasks.find(i => i.id === activedTask.id))
        }
        const checkNum = tasks.reduce((a, b) => a + (b.checked ? 1 : 0), 0)
        if (checkNum > 0 && checkNum < tasks.length) {
            setRootCheckStatus('partial-checked')
        } else if (checkNum === 0) {
            setRootCheckStatus('unchecked')
        } else {
            setRootCheckStatus('checked')
        }
    }, [tasks])

    const TaskItemClickHandler: TaskItemProps['onClick'] = (task) => {
        setDetailsStatus('view')
        const targetTask = tasks.find(i => i.id === task.id)
        setActivedTask(targetTask)
    }

    const closeDetailsHandler = () => {
        setDetailsStatus('view')
        setActivedTask(x => undefined)
    }


    const rootcheckChange = (checked: boolean) => {
        if (checked) {
            dispatch!({ type: 'checkAll' })
        } else {
            dispatch!({ type: 'unCheckAll' })
        }
    }

    const deleteTask = () => {
        const deleteTaskIds = tasks.filter(i => i.checked).map(i => i.id)
        dispatch!({ type: "remove", paylod: deleteTaskIds })
    }


    const addTask = () => {
        const newTask = {
            id: `id_${Math.random().toFixed(10)}`,
            name: 'new task',
            createTime: '2023-01-10'
        }
        dispatch!({ type: "add", paylod: newTask })
        setActivedTask(newTask)
        setDetailsStatus('edit')
    }
    return (
        <App>
            <TaskProvider.Provider value={provideData}>
                <HeadNav>
                    <button onClick={addTask}>add</button>
                    <button onClick={deleteTask}>delete</button>
                </HeadNav>
                <Main>
                    <article>
                        <TaskHeadNav checkStatus={rootCheckStatus} checkChange={rootcheckChange} />
                        <ul>
                            {
                                tasks.length
                                    ? tasks.map((task) => (<TaskItem
                                        key={task.id}
                                        task={task}
                                        active={activedTask?.id === task.id}
                                        onClick={TaskItemClickHandler}
                                    />))
                                    : <NoData />
                            }
                        </ul>
                    </article>
                    <aside>
                        <Details
                            task={activedTask}
                            show={!!activedTask}
                            status={detailsStatus}
                            onSave={() => setDetailsStatus('view')}
                            onClose={closeDetailsHandler}
                            onEdit={() => setDetailsStatus('edit')}
                        />
                    </aside>
                </Main>
                <Footer />
                <GlobalStyle />
            </TaskProvider.Provider>

        </App>
    )
}

export default TodoApp