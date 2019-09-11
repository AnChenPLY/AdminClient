/*
    应用根组件
    UI组件：负责显示（初始显示和更新显示）
    在编码上没有使用到redux相关语法
 */
import React, { Component } from "react";
class Counter extends Component {


  incremnet = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.increment(number)
    decremnet = () => {
      const number = this.refs.numberSelect.value * 1;
      this.props.decrement(number)
    };
    incremnetifOdd = () => {
      const number = this.refs.numberSelect.value * 1;
      const count = this.props.count
      if (count % 2 === 1) {
        this.props.increment(number)
      }
    };
    incremnetAsync = () => {
      setTimeout(() => {
        const number = this.refs.numberSelect.value * 1;
        this.props.increment(number)
      }, 1000);
    };
    render() 
      console.log('render()');
      const count = this.props.count
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
export default Counter
