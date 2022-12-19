import { FC, useState, useRef, useEffect } from 'react'
const UseStateDemo: FC = () => {
    const [count, setCount] = useState(0)
    const countRef = useRef(count) // 保存一个值，组件更新不影响它的值
    console.log('函数组件执行 count = ', count)

    useEffect(() => {
        console.log('useEffect 执行')
        countRef.current = count
    })

    const addSyncHandler = () => {
        setCount(x => x + 1)
    }
    const addAsyncHandler = () => {
        setTimeout(() => {
            console.log(countRef.current)
            setCount(countRef.current + 1)
            // setCount(count + 1) // 取的是当前帧的count值，而不是最新的 count 值
            // setCount(x => x + 1) // x 取的值是最新的 state 值，依赖最新的值修改
        }, 3000)
    }

    return <>
        <div>UseStateDemo</div>
        <div>{count}</div>
        <button onClick={addSyncHandler}>Add Count sync</button>
        <button onClick={addAsyncHandler}>Add Count async</button>
    </>
}

export default UseStateDemo