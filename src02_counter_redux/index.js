/*入口js */
import React from "react";
import ReactDom from "react-dom";
import store from "./redux/store";

import App from "./App";
ReactDom.render(<App store={store} />, document.getElementById("root"))


//绑定监视store内部状态数据的改变的监听
/*
    重新渲染标签
 */
store.subscribe(()=>{ReactDom.render(<App store={store} />, document.getElementById("root"))})
