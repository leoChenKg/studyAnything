import { useCallback, useState } from "react";
import styled from "styled-components";
import classNames from 'classnames'
import { GlobalStyle } from "./globalStyle";
import Main from "./Main";
import TaskHeadNav from './TaskHeadNav'
import TaskItem from "./TaskItem";
import useTask from "./useTask";



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

    const [showDetails, setShowDetails] = useState(false)
    const [tasks, dispath] = useTask()

    const MainClasses = classNames({ 'show-details': showDetails })

    return (
        <App>
            <HeadNav />
            <Main className={MainClasses}>
                <article>
                    <TaskHeadNav />
                    <ul>
                        {
                            tasks.length ? tasks.map((task) => <TaskItem key={task.id} />) : <NoData />
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