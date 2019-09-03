import React from 'react'

import './index.less'
/*
    1.自定义的看似链接实是button组件
    2.children标签属性：
        字符串
        标签对象
        标签对象的数组
 */
export default function LinkButton (props){
    return <button className='link-button' {...props}></button>
}