import React, { FC, useContext, useState } from 'react'

interface Context {
    count: number
}
const TestContext = React.createContext<Context>({ count: 0 })


const Root: FC = () => {
    const [countMsg, setCountMsg] = useState({ count: 0 })

    const countMsgHandler = () => {
        setCountMsg(x => ({ count: x.count + 1 }))
    }

    return <TestContext.Provider value={countMsg}>
        <Sub />
        <button onClick={countMsgHandler}>set countMsg</button>
    </TestContext.Provider>
}

const Sub: FC = () => {
    const Context = useContext(TestContext)!
    return <>
        <div>Sub com</div>
        <div>Context Value: {Context.count}</div>
    </>
}


export default Root