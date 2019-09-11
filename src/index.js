/*入口js */
import React from "react";
import ReactDom from "react-dom";
import { Provider, } from 'react-redux'

import store from "./redux/store";
import App from "./containers/App";

ReactDom.render(
    /*Provider会将接收到store对象提供给所有的容器组件 */
    <Provider
        store={store} 
    > 
    <App/></Provider>, document.getElementById("root")
)
