/*
    应用根组件
 */
import React, {Component} from 'react'
import { message} from 'antd'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './views/login/login'
import Admin from './views/admin/admin'


class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />          
          <Route path='/' component={Admin} />          
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
