import React from 'react'
import img from '@/utils/img'
//什么是JSX：
//JSX=Javascript XML 是一种语法糖
//为什么要使用JSX？在React开发中，JSX语法是可选的，但是React官方建议使用JSX，使用JSX写代码，代码更加优雅，便于维护。
// JSX是变量，对象，React元素
//JSX中可以使用表达式，但要使用 {} 包起来
//JSX可以嵌套
//JSX中，class这个属性要写成 className
//JSX中，for这个属性要写成 htmlFor
//JSX中，注释内容也要使用{/**/}包裹
//JSX中，默认可以防注入攻击(XSS)
//JSX可以复用

//React元素 vs. React类
//简单理解：视觉上看起来像是HTML结构的玩意，就是React元素，也叫JSX

const yellow ='jsx2'

const ele1= <div className='jsx'>Hello JSX</div>

const ele2=<div className={yellow}>{ Math.random() }</div>

const ele3 =<div >{ ele1 }{ ele2 }</div>

const ele4=()=><div>{ ele3 }</div>

function ele5() {
  return ele4()
}

//如果不使用jsx语法糖，需要这样写：
const ele6 =React.createElement(
    'div',
    {className:'jsx'},
    'Hello JSX'
)

const ele7 =  <img className='img' src={img.logo}/>

//类组件
 class TestJsx extends React.Component{
    render(){
         return <div>
             { ele1 }
             { ele2 }
             { ele3 }
             <hr/>
             { ele4() }
             <hr/>
             { ele5() }
             { /*这是小logo */}
             <img className='img' src={img.logo}/>
             <hr/>
             { ele6 }
             <hr/>
             { ele7 }
         </div>
    }
}

//函数式组件(无状态组件)
// 用function关键字来定义，也可以使用箭头函数来定义
export default ()=>{
    const bol =Math.random()>0.5
    return (
        <div>
             { ele1 }
             { ele2 }
             { ele3 }
             <hr/>
             { ele1 }
             { ele4() }
             <hr/>
             { ele5() }
             { /*这是小logo */}
             <img className='img' src={img.logo}/>
             <hr/>
             { ele6 }
             <hr/>
             { ele7 }
             <hr/>
             { bol? ele1:ele2 }
         </div>
    )
}