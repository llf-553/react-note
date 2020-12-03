import React from 'react'

//comment()是函数，它接收一个ui组件作为参数，返回一个新的组件
//它的作用是用于对UI组件进行修饰或包装，为了复用业务逻辑
export default function comment(WrappedCompnent){ 
    return class extends React.Component {
        constructor(props){
            super(props)
            this.state={
                commentList:[]
            }
            
         }
         componentDidMount(){
             //假如在这里掉后端api接口
             const res = [
                {id:1,content:'你真棒1',user:'zhangsan'},
                {id:2,content:'你真棒2',user:'zhangsan'},
                {id:3,content:'你真棒3',user:'zhangsan'},
                {id:4,content:'你真棒4',user:'zhangsan'},
                {id:5,content:'你真棒5',user:'zhangsan'}
                    
             ] 
             this.setState({commentList:res})

         }
        render(){
            let { commentList }=this.state
            let props=this.props
            return (
                <WrappedCompnent list={commentList} {...props}/>
            )
        }
    }
}