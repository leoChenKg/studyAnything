import { useCallback } from "react";
import useTask from "./useTask";

const TodoApp = () => {

    const [tasks, dispath] = useTask()



    return <>
        <nav></nav>
        <main>
            <article>
            </article>
            <aside>
            </aside>
        </main>
        <footer></footer>
    </>
}

export default TodoApp