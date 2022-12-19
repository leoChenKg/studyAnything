import { FC, useEffect, useState } from "react"

const UseEffectDemo: FC = () => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        // setCount(count + 1) // 没有控制 effect 执行实际的时候不要在 effect 中修改变量值，否则会引起无限更新

        console.log('useEffect 执行')
        let timer = window.setInterval(() => {
            console.log('useEffect 中 timer 执行')            
        }, 1000)

        // 组件卸载时执行
        return () => {
            console.log('useEffect 返回的函数执行')      
            clearTimeout(timer)
        }
    })

    return <>
        <div>UseEffectDemo</div>
        <div>{count}</div>
    </>
}


export default UseEffectDemo