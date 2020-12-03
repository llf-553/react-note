import React from 'react'
import routes from '@/views'
import { 
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

export default props=>{
   
   //Route是那把椅子
  // 生成路由匹配规则，当url和Route.path匹配成功，显示当前配对成功的Route.component
  // 凡是被 Route 组件直接包裹的React组件中，其props上都有路由相关的 API
  const createRoutes = ()=>{
      let res = []
   //封装一个递归的方法
   const serChildren=arr=>{
    arr.map(ele=>{
      res.push(
         <Route
         key={ele.id}
         path={ele.path}
         component={ele.component}
         exact  
       />
      )
      if(ele.children) serChildren(ele.children)
    })
   }
   //1.先遍历第一层，不要路由等；第二层开始才需要；可能会存在很多层，封装一个递归的方法
    routes.map(ele=>{
      if(ele.children){
        serChildren(ele.children)
      }
    })
    return res
  }

  return (
    <div className='qf-main'>
        {/* 作用：用于把Route数组组件包裹起来，当URL变化时从上到下进行匹配，匹配成功就终止 *
           当Route数组被包裹起来，建议给 Route都加上exact属性。
            在生成 Route 数组时，其外层不能包裹任何其实HTML节点，它的直接父组件只能是 Switch
        */}
        <Switch>
           { createRoutes() }
           <Redirect from='/*' to='/' />
        </Switch>
    </div>
  )
}