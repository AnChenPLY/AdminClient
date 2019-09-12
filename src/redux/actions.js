
/*
    包含n个用于创建action对象的工厂函数
 */


/*
    创建增加的action
 */
export const increment =(number)=>({
    type:'INCREMENT',number
})
/*
    创建减少的action
    同步action是对象
 */

export const decrement =(number)=>({
    type:'DECREMENT',number
})

/*
    异步增加的action
    异步action是一个函数，参数是dispath函数
    1）.执行异步代码
    2).完成后，分发一个同步action
 */
export function incrementAsync (number){
    return dispatch =>{
        // 执行异步代码
        setTimeout(()=>{
            // 完成后，分发一个同步action
            dispatch(increment(number))
        },1000)
    }
}