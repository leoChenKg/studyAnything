import React, { FC } from "react";



const TestContext = React.createContext<{
    count: number,
    addCnt?: (n: number) => void
} | null>(null)

export default class Demo extends React.Component {

    state = {
        count: 0
    }

    clickHandler = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (<TestContext.Provider value={{
            count: this.state.count, addCnt: (n: number) => {
                this.setState({
                    count: this.state.count + n
                })
            }
        }}>
            <Inner />
            <FnDemoInner />
            <button onClick={this.clickHandler}>change Context Value</button>
        </TestContext.Provider>)


    }
}



class Inner extends React.Component {

    static contextType = TestContext

    render() {
        console.log(this.context?.count)

        return (<div>
            <div>inner{this.context?.count}</div>
            <button onClick={() => this.context?.addCnt && this.context.addCnt(10)}>inner click</button>
        </div>)

    }

    declare context: React.ContextType<typeof TestContext>
}



const FnDemoInner: FC = () => {
    return <TestContext.Consumer>
        {(values) => <div>FnDemo {values?.count}
            <button onClick={() => values?.addCnt && values.addCnt(5)}>FnDemo click addCnt</button>
        </div>}
    </TestContext.Consumer>
}