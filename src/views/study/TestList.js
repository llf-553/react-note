import React from 'react'

export default class TestList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[
                {id:1,name:'张三',age:20},
                {id:2,name:'李四',age:21},
                {id:3,name:'王五',age:22},
                {id:4,name:'赵六',age:23}
            ]
        }
    }
    // 自定义视图渲染写法
    //当数组不需要二次转化处理时
    renderList(){
       let { list }=this.state
       return list.map(ele=>(
            <div key={ele.id}>       
                <span>{ele.id}</span>
                <span>-----</span>
                <span>{ele.name}</span>
                <span>------</span>
                <span>{ele.age}</span>
             </div>
       ))
    }
    //当数组需要二次转化处理时，建议使用这种写法
    renderList2(){
        let {list}=this.state
        let arr=[]
        list.map((ele,idx)=>{
            ele.age=ele.age+2
            ele.checked=ele.checked||false
            arr.push(
                <div key={ele.id}>   
                    <input type='checkbox' checked={ele.checked} onChange={(e)=>this.rowchange(e,idx)} />   
                    <span>{ele.id}</span>
                    <span>-----</span>
                    <span>{ele.name}</span>
                    <span>------</span>
                    <span>{ele.age}</span>
                    <button onClick={()=>this.rowClick(ele)}>操作</button>
                </div>
            )
        })
        return arr
    }
    rowchange(e,idx){
        console.log("e",e.target.value,e.target.checked)
      
        this.setState(state=>{
            state.list[idx].checked=e.target.checked
            console.log('list',state.list)
            return {
                list:state.list
            }
        })

    }
    rowClick(ele){
        console.log(ele,ele.id,ele.name)
    }
    render(){
        let {list}=this.state
        //构造一个数组，来承载JSX对象(React元素)
        let arr=[]
        list.map(ele=>{
            ele.age=ele.age+2
            arr.push(
                <div key={ele.id}>       
                    <span>{ele.id}</span>
                    <span>-----</span>
                    <span>{ele.name}</span>
                    <span>------</span>
                    <span>{ele.age}</span>
                </div>
            )
        })
        return (
            <div>
                <h1>测试列表</h1>
                <hr/>
                {
                    [<div key="1">1</div>,<div key="2">2</div>,<div key="3">3</div>,<div key="4">4</div>]
                }
                <hr/>
                {/* 以下两种写法是等价的，区别是一个封装，一个没封装*/}
                {
                    list.map(ele=>(
                        <div key={ele.id}>       
                            <span>{ele.id}</span>
                            <span>-----</span>
                            <span>{ele.name}</span>
                            <span>------</span>
                            <span>{ele.age}</span>

                        </div>
                    ))
                }
                <hr/>
                {this.renderList()}
                <hr/>
               {/* 以下两种写法是等价的，区别是一个封装，一个没封装*/}
                {arr}
                <hr />
                { this.renderList2()}
            </div>
           

        )
    }
}