import { FC, useCallback, useMemo, useReducer, useRef } from 'react'

type State = {
    list: Array<{ name: string, age: number }>
}
const data: State = {
    list: [
        {
            name: 'leo',
            age: 24
        },
        {
            name: 'cyx',
            age: 24
        },
        {
            name: 'lsq',
            age: 24
        },
        {
            name: 'lm',
            age: 23
        },
    ]
}

type Action = {
    type: 'add',
    paylod: { name: string, age: number }
} | {
    type: 'remove',
    paylod: number

}

const UseReducerDemo: FC = () => {
    const [state, dispatch] = useReducer((state: State, action: Action): State => {
        switch (action.type) {
            case 'add':
                return {
                    list: [...state.list, action.paylod]
                }
            case 'remove':
                const list = [...state.list]
                list.splice(action.paylod, 1)
                return { list }
            default:
                return state
        }
    }, data)

    console.log(state)

    return <div>
        <SubCom state={state} dispatch={dispatch} />
    </div>
}
interface SubComProps {
    state: State,
    dispatch: (action: Action) => void
}
const SubCom: FC<SubComProps> = (props) => {
    console.log(props)
    const { state: { list }, dispatch } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const add = useCallback(() => {
        dispatch({ type: 'add', paylod: { name: 'kg', age: 24 } })
    }, [])
    const remove = useCallback(() => {
        const removeIndex = parseInt(inputRef.current!.value || '0')
        if (removeIndex < 0 || removeIndex > list.length - 1) {
            return window.alert('没有此行！')
        }
        dispatch({ type: 'remove', paylod: removeIndex })
    }, [list])

    return (<div>
        {
            list.map((item, idx) => (
                <div key={item.name + idx}>
                    index: {idx} --- name: {item.name} --- age: {item.age}
                </div>
            ))
        }
        <button onClick={add}>Add Person</button>
        <div>
            <input ref={inputRef} type="number" /><button onClick={remove}>remove Person</button>
        </div>
    </div>)
}

export default UseReducerDemo
