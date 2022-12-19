import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'



const Demo: FC = () => {
    const [count, setCount] = useState(0);

    // useLayoutEffect
    useEffect(() => {
        if (count === 0) {
            let i = 0
            while (i <= 1000000000) {
                i++
            }
            const randomNum = 10 + Math.random() * 200
            setCount(randomNum);
        }
    }, [count]);

    return <>
        <div >{count}</div>
        <button onClick={() => setCount(0)}>click</button>
    </>
}


export default Demo