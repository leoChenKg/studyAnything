import { useCallback, useState } from "react";
import styled from "styled-components";
import classNames from 'classnames'
import { GlobalStyle } from "./globalStyle";
import Main from "./Main";
import TaskHeadNav from './TaskHeadNav'
import useTask from "./useTask";


const App = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const HeadNav = styled.div`
    flex: 0 0 4rem;
    border-bottom: 1px solid #ddd;
`

const Footer = styled.div`
    flex: 0 0 4rem;
    border-top: 1px solid #ddd;
`

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