import React from 'react'

// import TestJsx from './views/study/TestJsx'
// import TestProps from './views/study/TestProps'
// import TestEvent from './views/study/TestEvent'
// import TestState from './views/study/TestState'
// import TestCondition from './views/study/TestCondition'
// import TestList from './views/study/TestList'
// import TestForm from './views/study/TestForm'
// import TestLift from './views/study/TestLift'
// import TestLang from './views/study/TestLang'
// import TestLift from './views/study/TestLift'
// import TestCombine from './views/study/TestCombine'
// import TestContext from './views/study/TestContext'
// import TestHoc from './views/study/TestHoc'
// import TestType from './views/study/TestTypes'
// import TestHook from './views/study/TestHook'

import { Layout } from '@/components'

//路由
import{
    HashRouter,
    BrowserRouter,

}from 'react-router-dom'

// mobx-react 这个库用于把 mobx 和 react 组件连接起来
import {Provider} from 'mobx-react'
import store from './store'

 
//jsx语法
// const ele = <h1>Hello React 2020</h1>
//类组件定义
/* class App extends React.Component {
    render() {
        return ele
    }
} */

import ThemCtx from '@/utils/theme'

//函数式组件，组件定义
class  App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            color:"#000",
            background:'#fff'
        }
    }
    toggleTheme(){
       this.setState(state=>({theme:Math.random()>0.5? themes.light:themes.dark}))  
      
    }
    themeChange(key,e){
        this.setState({[key]:e.target.value})
    }
    render(){
        let { color,background }=this.state
      return(
        <HashRouter>
            {/* 是一个组件，它是基于React上下文来封装的 */}
          <Provider store={store}>
            <ThemCtx.Provider value={{color,background}}>
               <Layout/>
            {/*   <div>  */}
                {/*  <TestProps 
                msg2='hello msg' 
                hello='hello child' 
                bol={true} 
                arr={[1,2,3,4]}
                obj={{name:"张三",age:18}}
                ele={<div>react ele</div>}
                /> */}
                {/* <TestEvent /> */}
                {/* <TestState /> */}
                {/* <TestCondition /> */}
                {/* <TestList /> */}
                {/* <TestForm /> */}
                {/* <TestLift /> */}
                {/* <TestLang /> */}
                {/* <TestLift /> */}
                {/* <TestCombine /> */}
                {/* <TestContext /> */}
                {/*   <input type='color' value={color} onChange={(e)=>this.themeChange('color',e)}/>
                <input type='color' value={background} onChange={(e)=>this.themeChange('background',e)}/>
                <button onClick={()=>this.toggleTheme()}>切换主题色</button>  */}
            {/*     <TestHoc /> */}
                {/* <TestType/> */}
                {/* < TestHook /> */}
                {/* </div> */}
            </ThemCtx.Provider>
          </Provider>
        </HashRouter>
     )
    }
    
}
export default App