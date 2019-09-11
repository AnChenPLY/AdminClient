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
 */
export const decrement =(number)=>({
    type:'DECREMENT',number
})