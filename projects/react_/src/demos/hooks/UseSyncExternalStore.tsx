import { FC, useCallback, useEffect, useState, useSyncExternalStore } from "react";

const useCount = (): [number, React.Dispatch<React.SetStateAction<number>>] => {
    const [count, setCount] = useState(0)
    const [countChangeTimes, setCountChangeTimes] = useState(10)

    const newCount = useSyncExternalStore<number>((onStoreChange) => {
        console.log('xxxx newCount', newCount)
        return () => {
            
        }
    }, useCallback(() => count, [count]))

    return [countChangeTimes, setCount]
}


const Demo: FC = () => {
    const [countChangeTimes, setCount] = useCount()
    return <>
        <div>{countChangeTimes}</div>
        <button onClick={() => setCount(x => x + 1)}>setCount</button>
    </>
}
export default Demo