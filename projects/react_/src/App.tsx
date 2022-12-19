import React from 'react'
import StateDemo from './demos/state'
import ContextDemo from './demos/context'
import RefsDemo from './demos/refs'
import './demos/hyperCom'
export default function App() {
    const refsDemoInnerRef = React.createRef<HTMLElement>()


    const clickhandler = () => {
        console.log(refsDemoInnerRef)
    }

    return <div>
        App
        <StateDemo>
            {
                (state) => <div>inner {state.count}</div>
            }
        </StateDemo>
        <ContextDemo />
        <RefsDemo ref={refsDemoInnerRef} a={1} b={2} />
        <button onClick={clickhandler}>console refsDemoInnerRef</button>
    </div>
}