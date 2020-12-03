//推荐的两种eslint关闭方式
/* eslint-disable*/
import '@/assets/css/common.scss'
import '@/assets/css/style.scss'
//引入antd的样式wenj
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less'

/*eslint-enable*/
//只要用到了jsx语法，必须要用react
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

//render的第一参数，必须是一个React元素；第二个参数是真实的DOM节点
ReactDOM.render(<App />,document.getElementById('root'))


// console.log('我是react入口文件');
/* import img from '@/utils/img' //eslint-disable-line
document.getElementById('text').style.color = 'blue';
document.getElementById('img').src = img.logo; */