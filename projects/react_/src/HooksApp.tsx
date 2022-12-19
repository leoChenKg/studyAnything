import { FC, useState } from 'react'
import Divider from './utils/Divider'
import UseStateDemo from './demos/hooks/useState'
import UseEffectDemo from './demos/hooks/UseEffect'
import UseContextDemo from './demos/hooks/UseContex'
import UseReducerDemo from './demos/hooks/UseReducer'
import UseSyncExternalStoreDemo from './demos/hooks/UseSyncExternalStore'
import UseEffect_UseLayoutEffectDemo from './demos/hooks/useEffect_useLayoutEffet'

const HooksApp: FC = () => {

    const [ishowUseEffectDemo, setIshowUseEffectDemo] = useState(true)

    const toggleUseEffectDemo = () => {
        setIshowUseEffectDemo(x => !x)
    }

    return <>
        <h3>Hooks</h3>
        <Divider />
        {/* <UseStateDemo /> */}
        {/* {ishowUseEffectDemo ? <UseEffectDemo /> : null}
        <button onClick={toggleUseEffectDemo}>toggleUseEffectDemo</button> */}
        {/* <UseContextDemo /> */}
        {/* <UseReducerDemo /> */}
        {/* <UseSyncExternalStoreDemo /> */}
        <UseEffect_UseLayoutEffectDemo/>
    </>
}
export default HooksApp