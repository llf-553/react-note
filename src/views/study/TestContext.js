import React from 'react'
//上下文
// 在根组件上注入数据，然后组件树中所有组件节点都可以访问
// 特点：数据只能单向传递，即从根组件向后代组件传递
// 应用实践：状态管理就是借助上下文来实现数据的传递

import ThemCtx from '@/utils/theme'


/* export default class TestContext extends React.Component{
    render(){
        return (
            <ThemCtx.Consumer>
              {
                  (value)=>(
                    <div style={{color:value.color,background:value.background}}>
                      <h1>测试TestContext</h1>
                   </div>
                  )
              }
            </ThemCtx.Consumer>
        )
    }
} */

// import comment from '@utils/hoc/comment'
 class TestContext extends React.Component{
    render(){
        // console.log(this.context)
        const theme=this.context
        return (
                <div style={{color:theme.color,background:theme.background}}>
                    <h1>测试TestContext</h1>
                    <h2>我是子组件</h2>
                </div> 
        )
    }
} 

TestContext.contextType = ThemCtx
export default TestContext
