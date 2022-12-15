import React, { ReactNode } from 'react'


interface Props {
  children: (state: State) => ReactNode
}
interface State {
  count: number,
}

export default class Demo extends React.Component<Props, State> {

  state = {
    count: 0
  }

  clickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
    // this.setState(function (state, props) {
    //   console.log(state, props)
    //   return {
    //     count: state.count + 1
    //   };
    // });

  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.clickHandler}>add count</button>
        {this.props.children && this.props.children(this.state)}
      </div>
    )
  }
}
