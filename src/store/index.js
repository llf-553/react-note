//使用 mobx 这个库，定义并创建一个 store
// mobx-react 这个库用于把 mobx 和 react 组件连接起来

import {
    observable,
    action,       //行为，改变可观察的数据
    makeAutoObservable , //可被观察的
    makeObservable,
    computed
}from 'mobx'

//分modules
import TodoStore from './module/todo'
import MusiStore from './module/music'

//mobx6写法
class Store{
    constructor(){
        //子store实例化
        this.todo=new TodoStore
        this.music=new MusiStore
        // makeAutoObservable(this)      //this把当前这个类上所有的变成观察者
        makeObservable(this,{
            msg:observable,
            changeMsg:action
        })
    }
    msg='Hello msg'
    //action
    changeMsg(payload){
        this.msg = payload
    }
}

export default new Store()

//mobx5的写法
// 在mobx5中，是没有 makeObservable/makeAutoObservable 这些api
/* class Store{
    constructor(){
        this.todo = new TodoStore()
    }
    @observable msg='hello msg'
    @action
    changeMsg(){

    }
    @computed
    get total(){
        return this.msg.length
    }
} */