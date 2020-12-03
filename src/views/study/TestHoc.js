import React from 'react'

//高阶组件
//作用：是React中业务逻辑复用的一种方案
// 高阶组件是一种基于React组合特性而得来的一种设计模式，软件开发经验
// 高阶组件也被称为高阶函数，纯函数，容器组件

/* function fn(){
    return function(){
        return function(){
            console.log(111)
        }
    }
}
fn()()() */
import {comment,themeHoc,roleHoc} from '@/utils/hoc'


//装饰器是ES6新增的特性
// 装饰器的有两个类：一个用于修饰一个类，其二可以修饰类的方法
@themeHoc
@roleHoc
@comment 
class TestHoc extends React.Component{
    render(){
        console.log('props',this.props)
        let { list,userinfo }=this.props
        return (
          <div>
              <h1>测试高阶组件</h1>
              <hr/>
              {
               list.map(ele=>(
                   <div key={ele.id}>
                       <span>{ele.user}</span>
                       <span>----</span>
                       <span>{ele.content}</span>
                    
                       {
                           userinfo.role === 1 && [<span key='1'>-------</span>,<span key='2'>删除</span>]
                       }
                   </div>
               ))
              }
          </div>
        )
    }
}

// export default themeHoc(comment(TestHoc))
export default TestHoc