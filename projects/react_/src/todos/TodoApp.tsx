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

const TodoApp = () => {

    const [tasks, dispath] = useTask()

    const [showDetails, setShowDetails] = useState(false)
    const [rootCheckStatus, setRootCheckStatus] = useState<CheckStatus>("unchecked")
    const checkObj = useRef<{ [props: string]: boolean }>({})

    const MainClasses = classNames({ 'show-details': showDetails })

    const checkChange = useCallback<TaskItemProps['checkChange']>((task, checked) => {
        if (checked) {
            checkObj.current[task.id] = checked
        } else {
            delete checkObj.current[task.id]
        }

        // 设置 root checkbox 状态
        const checkNum = Object.keys(checkObj.current).length 
    }, [])

    return (
        <App>
            <HeadNav />
            <Main className={MainClasses}>
                <article>
                    <TaskHeadNav checkStatus={rootCheckStatus} />
                    <ul>
                        {
                            tasks.length ? tasks.map((task) => <TaskItem task={task} checkChange={checkChange} key={task.id} />) : <NoData />
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