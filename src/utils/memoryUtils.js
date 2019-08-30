import storageUtils from './storageUtils'



export default{
    user:storageUtils.getUSer()//用来存储登陆用户的信息，初始值为local中读取的user
}