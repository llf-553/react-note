import{
    makeObservable,
    observable,
    action,
    computed
}from 'mobx'


export default class TodoStore{
    constructor(){
        makeObservable(this,{
            list:observable,
            addTask:action,
            delTask:action,
            total:computed
        })
    }
    list =[
        {id:1,task:'吃饭'},
        {id:2,task:'睡觉'},
        {id:3,task:'打豆豆'},
    ]
    addTask(payload){
        this.list.push({id:Date.now(),task:payload})
    }
    delTask(payload){
        this.list=this.list.filter(ele=>(ele.id!=payload))
    }
    //相当于是 vuex中的计算属性getters
     get total(){   
        return this.list.length
    }
}
