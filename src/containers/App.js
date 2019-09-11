/*
    应用根组件
 */
import React, { Component } from "react";
import { connect } from 'react-redux'

import Counter from '../components/counter';
import { increment,decrement } from '../redux/actions';


/*
  应用根组件：通过包装UI组件(Counter)
  容器组件：通过connect产生的
 */

 /*
  将特定的state数据映射(转换)成一般属性传递给UI组件(Counter)
  redux在调用此函数时，传入了store.getState()的值
  */

// const mapStateToprops = (state) => ({//返回的对象的所有属性传递给UI组件
//   count:state,
//   xxx:state+1
// })


 /*
  将包含dispatch函数调用语句的函数映射(转换)成函数属性传递给UI组件(Counter)
  redux在调用此函数时，传入了store.dispatch的值
  */
// const mapDispatchToProps =(dispatch)=>({
//   increment:(number)=>{dispatch(increment(number))},
//   decrement:(number)=>{dispatch(decrement(number))},
// })



// export default connect(
//   mapStateToprops,//用来指定传递哪些一般属性(非函数)
//   mapDispatchToProps//用来指定传递哪些函数属性(函数)
// )(Counter)


export default connect(
  state =>({count:state}),
  {increment,decrement}
)(Counter)