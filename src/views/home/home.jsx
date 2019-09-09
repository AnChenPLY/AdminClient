import React, { Component } from 'react'

import './home.less'

/*
    首页路由组件
 */

export default class Home extends Component {
    render() {
        return (
            <div className='home' style={{textAlign:'center',fontSize:'40px',lineHeight:'600px'}}>
                这是用react设计的一个商品的后台管理系统
            </div>
        )
    }
}
