import React from 'react'

export default class TestState extends React.Component{
    constructor(props){
        super(props)
        this.state={
          count:100,
          a:1,
          b:2,
          c:3,
          price:9,
          
        }
    }
    changeCount(){
        
        //setState()是React中专门用于更新VM，触发diff运算，更新视图
        //setState()默认是异步的，但在定时器中却是同步的
        //setState(fn1,[fn2])fn1必须返回一个新的state,fn2表示更新state完成
        //setState({bol:true}) //不需要旧值运算时，只是直接更新
        setTimeout(()=>{
            console.log('clickCount 1111')
            this.setState((state,props)=>{
                return {
                    count:state.count+1 
                }
            },()=>{
                console.log('done')
            })
            console.log('clickCount 22222')
        },1000)

    }

    changeABC(){
        // 当有多个setState执行时，React会自动将其合并，只执行一次diff运算，一次视图更新
        this.setState({a:1000})
        this.setState({b:2000})
        this.setState({c:3000})
    }

 /*    this.setState({
      a:1000,
      b:2000,
      c:3000
    })
 */
    render(){
        let { count,price,a,b,c}=this.state
        return (
            <div>
                <h1>测试state</h1>
                <hr/>
                <h1>{count}</h1>
                <h1>{price}</h1>
                <h1>{count*price}</h1>
                <button onClick={()=>this.changeCount()}>改变count</button>
                <hr/>
                <h2>{ a }</h2>
                <h2>{ b }</h2>
                <h2>{ c }</h2>
                <button onClick={()=>this.changeABC()}>改变ABC</button>
            </div>
        )
    }
}