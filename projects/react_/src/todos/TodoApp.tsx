import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import classNames from 'classnames'
import { GlobalStyle } from "./globalStyle";
import Main from "./Main";
import TaskHeadNav from './TaskHeadNav'
import TaskItem, { TaskItemProps } from "./TaskItem";
import useTask from "./useTask";
import { CheckboxProps, CheckStatus } from "./CheckBox";



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
const TodoApp = () => {

    const [tasks, dispatch] = useTask()
    const [showDetails, setShowDetails] = useState(false)
    const [rootCheckStatus, setRootCheckStatus] = useState<CheckStatus>("unchecked")
    const [activeTaskId, setActiveTaskId] = useState<string>()

    const MainClasses = classNames({ 'show-details': showDetails })

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


    const rootcheckChange = (checked: boolean) => {
        if (checked) {
            dispatch({ type: 'checkAll' })
        } else {
            dispatch({ type: 'unCheckAll' })
        }
    }

    const TaskItemClickHandler: TaskItemProps['onClick'] = (task) => {
        setShowDetails(true)
        dispatch({ type: "update", paylod: { ...task, 'active': true } })
    }

    return (
        <App>
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
                                    key={task.id}
                                />))
                                : <NoData />
                        }
                    </ul>
                </article>
                <aside>
                </aside>
            </Main>
            <Footer />
            <GlobalStyle />
        </App>
    )
}

export default TodoApp