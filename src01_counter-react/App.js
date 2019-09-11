/*
    应用根组件
 */
import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0
  };
  incremnet = () => {
    const number = this.refs.numberSelect.value * 1;
    this.setState({
      count: this.state.count + number
    });
  };
  decremnet = () => {
    const number = this.refs.numberSelect.value * 1;
    this.setState({
      count: this.state.count - number
    });
  };
  incremnetifOdd = () => {
    const number = this.refs.numberSelect.value * 1;
    const { count } = this.state;
    if (count % 2 === 1) {
      this.setState({
        count: count + number
      });
    }
  };
  incremnetAsync = () => {
    setTimeout(() => {
      const number = this.refs.numberSelect.value * 1;
      this.setState({
        count: this.state.count + number
      });
    }, 1000);
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <p>click{count}</p>
        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.incremnet}>+</button>&nbsp;
        <button onClick={this.decremnet}>-</button>&nbsp;
        <button onClick={this.incremnetifOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incremnetAsync}>increment async</button>
      </div>
    );
  }
}

export default App;
