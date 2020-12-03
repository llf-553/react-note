import React from 'react'

import {
    useHistory,
    withRouter
} from 'react-router-dom'

//问题：没有被Route组件直接包裹的React组件中，是没有路由API的。那怎么办呢?
//在类组件中，只能使用 withRouter 来解决
// 在无状态组件中，可以使用 withRouter ，也可以使用 useHistory来解决

// widthRouter 是一个高阶组件，让那些没有被Route组件直接包裹的React组件拥有路由API
// useHistory 是ReactRouter提供的 Hook API,帮助我们在无状态组件中使用路由API

//一、使用Hooks 写法，来解决React无状态组件中没有路由API的问题

export default props=>{
    const histoty = useHistory()
    console.log('....header props',props)
    console.log('......header history',histoty)
    return(
        <div className='qf-header'>
             header
        </div>
    )
}

//二、使用withRouter高阶组件来解决React无状态组件中没有路由API的问题

/* export default withRouter(props=>{
    console.log('....header props',props)
    return(
        <div className='qf-header'>
             header
        </div>
    )
}) */

// 三、使用 withRouter高阶组件，解决React类组件中没有路由API的问题
// 有两种写法：装饰器的写法，或 ES5函数调用的写法

// @withRouter
/* class Header extends React.Component {

    render(){
        console.log('....header props',this.props)
        return(
            <div className='qf-header'>
                 header
            </div>
        )
    }
} */
// export default Header
// export default withRouter(Header)
