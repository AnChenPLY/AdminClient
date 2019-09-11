/*
    应用根组件
 */
import React, { Component } from "react";
import { increment,decrement } from './redux/actions';

class App extends Component {


  incremnet = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.store.dispatch(increment(number))
  };
  decremnet = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.store.dispatch(decrement(number))
  };
  incremnetifOdd = () => {
    const number = this.refs.numberSelect.value * 1;
    const count = this.props.store.getState()
    if (count % 2 === 1) {
      this.props.store.dispatch(increment(number))
    }
  };
  incremnetAsync = () => {
    setTimeout(() => {
      const number = this.refs.numberSelect.value * 1;
      this.props.store.dispatch(increment(number));
    }, 1000);
  };
  render() {
    console.log('render()');
    const count = this.props.store.getState()
    return (
      <div>
        <p>click{count}</p>
        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
                <button onClick={this.incremnet}>+</button>&nbsp;
                <button onClick={this.decremnet}>-</button>&nbsp;
                <button onClick={this.incremnetifOdd}>increment if odd</button>
        &nbsp;
                <button onClick={this.incremnetAsync}>increment async</button>
      </div>
    );
  }
}

export default App;
