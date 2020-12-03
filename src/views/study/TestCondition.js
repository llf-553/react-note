import React from 'react'

export default class TestCondition extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            gender:1,
            numIndex:1,
            display:"d1",
            styleDis:"block",
            size:20,
            color:'red'
        }
    }
    //自定义视图渲染方法
    initNumDiv(){
        let { numIndex }=this.state
        let ele =null
        switch (numIndex){
            case 1:
                ele=<div>11111</div>
                break;
            case 2:
                ele=<div>22222</div>
                break;
            case 3:
                ele=<div>33333</div>
                break;
            case 4:
                ele=<div>444444</div>
                break;
            default:

        }
        return ele
    }
    //自定义处理器
    change(key){
        switch(key){
            case 'gender':
                this.setState(state=>{
                    return {
                        gender:state.gender===1? 2: 1
                    }
                })
              break;
            case 'numIdx':
                this.setState({numIndex:Math.ceil(Math.random()*4)}) 
              break;
            case 'display':
             this.setState(state=>{
                 return{
                    display:state.display==="d1"?"d2":"d1"
                 }
             })
             break;
            case 'styleDis':
                this.setState(state=>{
                    let colorArr = ['red',"yellow",'blue','green','pink']
                    return {
                        styleDis:state.styleDis==='block'?'none':'block',
                        size:state.size+5,
                        color:colorArr[Math.floor(Math.random()*colorArr.length)]
                        
                    }
                })
             break;
            default:
        }
        
    }
    render(){
        let { gender,numIndex,display,styleDis ,size,color}=this.state
        return (
            <div>
                <h1>测试条件渲染</h1>
                <hr/>
               {/* 只有两个元素需要执行条件渲染，建议使用三元表达式 */}
                { gender ===1 ?  <div>女</div> :<div>男</div>}
                <button onClick={()=>this.change('gender')}>切换性别</button>
                <hr/>
                  {/* 只有两个以上元素需要执行条件渲染，建议使用&&来实现 */}
                { numIndex===1 && <div>111111</div>}
                { numIndex===2 && <div>222222</div>}
                { numIndex===3 && <div>333333</div>}
                {this.initNumDiv()}
                <button onClick={()=>this.change('numIdx')}>切换数字</button>
                <hr/>
                {/* 从动态 className 实现条件渲染 */}
                <div className={display}>我可有可无(动态的class来实现)</div>
                <button onClick={()=>this.change('display')}>显示/隐藏</button>
                <hr/>
                {/* 从动态 style 实现条件渲染 */}
                <div style={{color,fontSize:size+'px',display:styleDis}}>我是你可有可无的影子(动态style实现)</div>
                <button onClick={()=>this.change('styleDis')}>显示/隐藏</button>

            </div>
        )
        
    }
   
   
}