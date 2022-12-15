import React, { FC } from 'react'


interface FnDemoProps {
}
const FnDemo: React.ForwardRefRenderFunction<unknown, FnDemoProps> = (prop, ref) => {
    const innerRef = (ref as any) || React.createRef<HTMLDivElement>()
    return <div ref={innerRef}>
        <div>FnDemo</div>
    </div>
}

interface CompoundedComponent
    extends React.ForwardRefExoticComponent<FnDemoProps & React.RefAttributes<HTMLElement>> {
}

const WrapperFnDemo = React.forwardRef<unknown, FnDemoProps>(FnDemo) as CompoundedComponent



interface Props {
    forwardRef?: any,
}
const Inner: FC<Props> = (prop, context) => {

    const wrapperFnDemoRef = React.createRef<HTMLElement>()

    const clickHandler = () => {
        console.log(wrapperFnDemoRef)
    }
    return (
        <div>
            <div ref={prop.forwardRef}>inner ref element</div>
            <WrapperFnDemo ref={wrapperFnDemoRef} />
            <button onClick={clickHandler}>click show wrapperFnDemoRef</button>
        </div>
    )
}



const WrapDemo = React.forwardRef<HTMLElement, { a?: number, b?: number }>((props, ref) => <Inner {...props} forwardRef={ref} />)


export default WrapDemo

