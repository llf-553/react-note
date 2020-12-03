import React,{useState,useEffect} from 'react'

//Hook :一套API，用于解决函数式组件中缺少类组件相关特性的问题

//无状态组件，只有一个好处----性能高
//天然缺点：没有this,没有state状态，没有生命周期，没有上下文，没有ref
//但是在工作实践中，要在函数式组件中使用类组件的相关特性，该怎么办呢？
// 解决方案：使用 HOOK API 来解决
const TestHooks =props =>{
 
   //使用useState定义一个声明式变量count，当count变化时视图自动更新
   //setCount()是一个方法，它专门用于改变count的
   let [count,setCount]=useState(1000)

   let[list,setList]=useState([])

   let [msg,setMsg]=useState('Hello world')

   let timer=null

    const renderList =()=>{
        return list.map(ele=>(
            <div key={ele.id}>
                <span>{ele.id}</span>
                <span>-----</span>
                <span>{ele.name}</span>
            </div>
        ))
    }
   
     //使用React的生命周期
    //语法：useEffect(fn,[])
    //在同一个函数式组件中，可以使用多次useEffect
    // 建议，在同一个useEffect中，只做一件事
    //
    useEffect(()=>{
        //相当于 componentDidMount()
        timer=setTimeout(()=>{
           let res = [
            {id:1,name:'zhangsan 1'},
            {id:2,name:'zhangsan 2'},
            {id:3,name:'zhangsan 3'},
           ]  
           setList(res)
        },2000)
        //第一个参数是函数，它必须给一个return
        //相当于是 componentWillUnmount
        return ()=>{
         clearTimeout(timer)
        }
    },[])
      
    useEffect(function(){
        //相当于 componentDidMount()
        //呵呵，我要开启无敌的占内存的长连接
        return function(){
           //相当于是 componentWillUnmount
           //当组件销毁时，我会被调用
           //为了应用程序的性能优化，我要关闭这个长连接
        }
    },[])
    //第二个参数是伪数组
    //它相当于是 componentDidUpdate
   useEffect(()=>{
       setMsg(msg+'0')
       return undefined
   },[count]) //componentDidUpdate,当state发生变化，会执行setState,没完没了，第二个参数千万不要填自己
//第二个参数变化时，setMsg也会更新
    return (
        <div>
            <h1>测试Hooks</h1>
            <hr/>
            <h1>{count}</h1>
            <button onClick={()=>setCount(++count)}>加</button>
            <button onClick={()=>setCount(--count)}>减</button>
            <hr/>
            {
              list.map(ele=>(
                  <div key={ele.id}>
                      <span>{ele.id}</span>
                      <span>-----</span>
                      <span>{ele.name}</span>
                  </div>
              ))
            }
            <hr/>
            { renderList() }
             <hr/>
            <h2>{msg}</h2>
        </div>
    )
}
export default TestHooks