/*
    操作local数据的工具函数模块
 */
import store from 'store'

const USER_KEY='user_key'


 export default{
     saveUSer(user){
        //  localStorage.setItem('user_key',JSON.stringify(user))
        store.set(USER_KEY,user)
     },
     /*
        返回一个user对象，如果没有返回一个{}
      */
     getUSer(){
        //  return JSON.parse(localStorage.getItem('user_key')||'{}')
        return store.get(USER_KEY)||{}
     },
     removeUser(){
         store.remove(USER_KEY)
     },
 }