import React from 'react'

//UI组件：单纯的显示、容器组件
function CountChild(props){
    return (
        <h1>{ props.num }</h1>
    )
}

export default class TestEvent extends React.Component{
    constructor(props){
        super(props)
        //当state发生变化时，视图(包含子组件)自动更新
        this.state={
           num:0
        }

    }
    //ES5:使用bind()方式绑定的事件处理器，它的最后一个形参就是事件对象
    addHandle(arg1,arg2,e){
        // console.log('加',this)
        // console.log('参数列表',arg1,arg2,e)
        //setState()是React组件中，专门用于更新state的

       //不用使用这种写法
       //this.setState({num:this.state.num+1})
 
        //setState()更新state,触发Diff运算
        //ES5写法
       /*  this.setState(function(state,props){
            //返回一个新的虚拟DOM(vm)
            return {
                num:state.num+1
            }
        }) */
        //ES6
        this.setState((state,props)=>({num:state.num+1}))
    }
   
    //ES6:使用箭头函数来绑定事件处理器，不用考虑this指向问题
    //this就指向当前箭头函数所在类的实例对象
    subHandle(arg1,arg2,e){
        // console.log('减',this)
        // console.log('参数列表',arg1,arg2,e)
        this.setState((state,props)=>({num:state.num-1}))
    }
    render(){
        let{ num }=this.state
        return (
            <div>
               <h1>测试事件绑定</h1> 
               {/*把num这个state变量，通过props传给子组件 */}
              < CountChild num={num} />
              {/*绑定事件的第一种方法，使用bind(this)来改变this指向 */}
               <button onClick={this.addHandle.bind(this,1,2)}>+</button>
                 {/*绑定事件的第二种方法，使用箭头函数，它的this指向所在类的实例 */}
               <button onClick={(e)=>this.subHandle(1,2,e)}>-</button>
            </div>
        )
    }
}