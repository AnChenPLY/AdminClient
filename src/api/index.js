import ajax from './ajax'

const BASE =''
// export function reqLogin(username,password) {
//     return ajax({
//         method:'post',
//         url:BASE+'/login',
//         data:{//data是对象，默认使用json格式的请求体携带参数数据
//             username,
//             password
//         }
//     })
// } 
export const reqLogin=(username,password)=>ajax.post(BASE+'/login',{username,password})