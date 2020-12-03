import React from 'react'

const ChildA=props=>{
    return(
        <div>
           <h2> Child A</h2>
           <h2>{props.count}</h2>
           <button onClick={()=>props.onChange(10)}>ClickMe+10</button>
        </div>
    )
}

const ChildB=props=>{
    return(
        <div>
          <h2> Child B</h2>
          <h2>{props.count}</h2>
          <button onClick={()=>props.onChange(5)}>ClickMe-5</button>

        </div>
    )
}

// 当兄弟组件之间需要共享一些状态（数据）时
// 我们的做法是把这些需要共享的状态，定义在它们共同的父组件中。
// 这种做法就叫做“状态提升”。
export default class TestLift extends React.Component{
  constructor(props){
      super(props)
      this.state={
         count:0
      }
  }
   render(){
       let { count }=this.state
       return(
           <div>
               <h1>TestLift</h1>
               <hr/>
               <ChildA 
                 count={count}
                 onChange={step=>this.setState(state=>({count:state.count+step}))}
               />
               <hr/>
               <ChildB
                  count={count}
                  onChange={step=>this.setState(state=>({count:state.count-step}))}
               />
           </div>
       )
   }
}