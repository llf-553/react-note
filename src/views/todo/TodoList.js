import React ,{useState,useEffect}from 'react'

import {
    inject,
    observer
}from 'mobx-react'

//inject('store')()：把Provider上下文中的store数据添加到组件中 ；借助了高价组件
export default inject('store')(observer(props=>{
        // console.log('todo list props',props)
        let { todo }=props.store
        let [task,setTask]=useState('')
        const confirm =(e)=>{
           //监听enter事件
            // console.log('cofirm',e)
            if(e.keyCode===13){
                //向store.todo的lsit中添加一条task任务，通过状态管理的action
                todo.addTask(task)
                //清空表单
                setTask('')
                
            }
        }
        const delCofrim=(e,ele)=>{
           //组件默认事件
           e.preventDefault();
        //    console.log(ele.id)
           todo.delTask(ele.id)
           
        }
        return(
            <div>
                <h1>我的TodoList</h1>
                <hr/>
                <input 
                  type='text'
                  value={task} 
                  onChange={e=>setTask(e.target.value)}
                  onKeyUp={e=>confirm(e)}
                  />
                {
                    todo.list.map(ele=>(
                       <div key={ele.id}>
                           <span>{ele.id}</span>
                           <span>----</span>
                          <span>{ele.task}</span>
                          <span>----</span>
                          <a onClick={e=>delCofrim(e,ele)}href="www.baidu.com">删除</a>
                       </div>
                    ))
                }
                <h2>目前一共有<span>{todo.total}</span>条数据</h2>
            </div>
        )
    }
)) 


/* //类组件的写法
@inject('store')
@observer
class TodoList extends React.Component{

}
export default inject('store')(observer(TodoList)) */