import React, { useCallback, useEffect, useRef, useState, createContext, Dispatch, useMemo } from "react";
import styled from "styled-components";
import classNames from 'classnames'
import { GlobalStyle } from "./globalStyle";
import Main from "./Main";
import TaskHeadNav from './TaskHeadNav'
import TaskItem, { TaskItemProps } from "./TaskItem";
import useTask, { Action, Task } from "./useTask";
import { CheckboxProps, CheckStatus } from "./CheckBox";
import Details from "./Details";



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

    const [tasks, dispatch] = useTask()
    window.tasks = tasks
    const [showDetails, setShowDetails] = useState(false)
    const [rootCheckStatus, setRootCheckStatus] = useState<CheckStatus>("unchecked")
    const [activeTaskId, setActiveTaskId] = useState<string>()
    const curTask = useRef<Task>()

    const MainClasses = classNames({ 'show-details': showDetails })

    const provideData = useMemo(() => {
        return {
            tasks,
            dispatch
        }
    }, [tasks, dispatch])

    useEffect(() => {
        const checkNum = tasks.reduce((a, b) => a + (b.checked ? 1 : 0), 0)
        if (checkNum > 0 && checkNum < tasks.length) {
            setRootCheckStatus('partial-checked')
        } else if (checkNum === 0) {
            setRootCheckStatus('unchecked')
        } else {
            setRootCheckStatus('checked')
        }
    }, [tasks])


    useEffect(() => {
        curTask.current = tasks.find(task => task.id === activeTaskId)!
    }, [activeTaskId, tasks])

    const rootcheckChange = (checked: boolean) => {
        if (checked) {
            dispatch({ type: 'checkAll' })
        } else {
            dispatch({ type: 'unCheckAll' })
        }
    }

    const TaskItemClickHandler: TaskItemProps['onClick'] = (task) => {
        // 设置当前的active项
        setActiveTaskId(task.id)
        // 修改数据状态为 active： true
        dispatch({ type: "update", paylod: { ...task, 'active': true } })
        // 打开详细详细窗口
        setShowDetails(true)
        // 加载详情的数据
    }

    const closeDetail = () => {
        dispatch({ type: "update", paylod: { ...curTask.current!, 'active': false } })
        setActiveTaskId(undefined)
        setShowDetails(false)
    }
    const saveDetail = (value: string) => {
        dispatch({ type: "update", paylod: { ...curTask.current!, details: value } })
    }

    return (
        <App>
            <TaskProvider.Provider value={provideData}>
                <HeadNav />
                <Main className={MainClasses}>
                    <article>
                        {!showDetails ? <TaskHeadNav checkStatus={rootCheckStatus} checkChange={rootcheckChange} /> : null}
                        <ul>
                            {
                                tasks.length
                                    ? tasks.map((task) => (<TaskItem
                                        task={task}
                                        dispatch={dispatch}
                                        onClick={TaskItemClickHandler}
                                        active={activeTaskId === task.id}
                                        key={task.id}
                                    />))
                                    : <NoData />
                            }
                        </ul>
                    </article>
                    <aside>
                        <Details taskId={activeTaskId} close={closeDetail} save={saveDetail} dispatch={dispatch} />
                    </aside>
                </Main>
                <Footer />
                <GlobalStyle />
            </TaskProvider.Provider>

        </App>
    )
}

export default TodoApp