import React from 'react'
import PropTypes from 'prop-types'

//给类组件加props类型验证
class Child1 extends React.Component{
    render(){
        let { list,onChange }=this.props
        return (
            <div>
                <h2>我是 child1 子组件</h2>
                {
                    list.map(ele=>(
                     <div key={ele}>{ele}</div>
                    ))

                }
                <h2 onClick ={()=>onChange()}>乖儿子</h2>
            </div>
        )
    }
}
Child1.propTypes={
  list:PropTypes.array.isRequired,
  onChange:PropTypes.func.isRequired,
  gender:PropTypes.oneOf(['男','女']).isRequired  //枚举

}
export default class TestType extends React.Component{
    render (){
        return (
            <div>
                <h1>验证Props数据类型</h1>
                <Child1 
                  list={[1,2,3,4]} 
                  onChange={()=>(console.log(111))}
                  gender="男"
                />
            </div>
        )
    }
}