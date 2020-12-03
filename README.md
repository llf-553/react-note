# 技术栈
## 核心
+ 入口
+ 出口
+ loaders
+ plugins

## webpack
+ 作用：是当下前端工程化环境中使用最为广泛的构建工具。它的作用是把比较新的前端技术和文件模块、编译成浏览器能够识别、并尽可能兼容主流浏览器的代码(Html、css、ES5),它就是一个打包器
### 1、安装
+ *webpack 是核心库，它提供了很多API，可以用于编程

+ *webpack-cli 是命令行工具，它提供了一些很好用的命令行
    ```
    cnpm install webpack -g
    cnpm install webpack -D
    cnpm install webpack-cli -g
    cnpm install webpack-cli -D
    ```

+ 配置文件： 项目的入口和出口在这里运行。
  + 前端项目都运行在node.js环境中，这个配置文件是项目运行或打包时执行的
  + 它的语法是CommonJs模块化语法
  + 项目文件都与main.js关联起来，从入口进入，一层一层运行把它变成浏览器能够识别的玩意后从出口输出到dist这个文件夹中

+ *使用配置文件
   + webpack运行或打包时，默认使用 webpack.config.js这个文件
   + 1.在项目的根目录新建react.config.js文件
        ```js
        const path = require('path')
        module.exports = {
            //   入口
        // entry: path.resolve(__dirname, './src/main.js'),
        entry: {
            //给入口文件起个名字叫app
            app: path.resolve(__dirname, './src/main.js')
                //可以写绝对路径或相对路径
        },
        //出口
        output: {
            filename: '[name]. [chunkhash].js', //将代码中一堆文件打包成一捆,打包好的文件名第一个是name,第二个是hash值
            path: path.resolve(__dirname, './dist') //只能写绝对路径
          }
         }
        ```
   + 2.package.json中'scripts'内更改：
        ```
        "build": "webpack --config react.config.js"
        ```
   + 3.命令行开启
        ```
        npm run build
        ```

+ *webpack-dev-serve:它是使用express编写的用于创建本地node服务的第三方包。一个小型的node.js Express服务器。简单来说，就是一个小型的静态文件服务器
  + 1.安装
    ```
    cnpm install webpack-dev-server -D
    ```
  + 2.package.json中'scripts'内添加：
    ```
    "start": "webpack serve --config react.config.js"
    ```
  + 3.react.config.js中添加devServer对象进行配置
    ```js
        devServer: {
            port: 8888, //开启的端口号
            contentBase: "./public", //指定本地服务的静态资源目录
        }
    ```
  + 4.命令行开启
    ```
    npm start
    ```

+ plugins:用于把打包后的js/css等资源，自动插入到public/index.html中。

+ *html-webpack-plugin:把打包好的静态资源和指定的html关联起来。

  + 1. 安装
    ```
     cnpm install html-webpack-plugin -D
    ```
  + 2.react.config.js中
    ```js
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     ...
     plugins: [
        new HtmlWebpackPlugin({ //把打包完的静态资源和指定的html关联起来
            template: path.resolve(__dirname, 'public/index.html'),
            title: 'React'
        }),
    ]
    ```

+ *clean-webpack-plugin:在每次执行npm run build时，自动帮我们清理dist
  + 1.安装
    ```
     cnpm install clean-webpack-plugin -D
    ```
  + 2.react.config.js中
    ```js
     const { CleanWebpackPlugin } = require('clean-webpack-plugin');
     ...
     plugins: [
        new HtmlWebpackPlugin({ //把打包完的静态资源和指定的html关联起来
            template: path.resolve(__dirname, 'public/index.html'),
            title: 'React'
        }),
        new CleanWebpackPlugin()
    ]
    ```

+ *HMR(Hot Module Replacement):模块热替换(热更新)
  + 1.react.config.js中
    ```js
    const webpack = require('webpack');
    devServer: {
        port: 8888, //开启的端口号
        open: true,
        hot: true, ////实现HMR(Hot Module Replacement)
        contentBase: "./public", //指定本地服务的静态资源目录
    }
    ```

 + *loaders:webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。指在main.js中可以引入其他文件。比如aseet/css/common.css通过loader与public/index.html关联。
   + 在webpack眼中一切皆模块。webpack根据你定义的规则来编译各种不同后缀的模块。
   + 一、css：
   + 在module中定义规则，来编译css模块
     + style-loader：将模块导出作为样式添加到DOM中
     + css-loader:编译css文件后，使用import加载，并返回css代码
     + 反向执行
      + 1.安装style-loader css-loader
        ```
        cnpm install style-loader css-loader -D
        ```
      + 2.react.config.js中
        ```js
          module: {
              rules: [
              { test: /\.css$/, use: ['style-loader', 'css-loader'] } //在main.js中导入的文件是以.css结尾的
            ]
          }
        ```
    + 二、Sass:
      + 1.安装node-sass sass-loader
        ``` 
        cnpm install sass-loader node-sass -D
        ```
       + 如果node-sass装不成功，换成yarn包管理工具
         ```
         npm i yarn -g
         yarn add node-sass -D
         ```

      + 2.react.config.js中 module: { rules:[ ]}内
        ```js
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ```
    + 三、img
      + 1.安装
         ```
         cnpm install file-loader -D
         ```
      + 2.react.config.js中 module: { rules:[ ]}内
        ```js
          { test: /\.(png|svg|jpg|jpeg|gif)$/, use: ['file-loader'] }
        ```
     + 四、babel:js编译，把ES6语法转化成主流浏览器兼容的代码
          + 1.安装 babel-loader:用于加载.js文件，并交给@babel/*编译器  @babel/core:babel的核心库、 @babel/preset-env：编译大多数es6代码成主流浏览器能兼容的ES5代码、@babel/preset-react:编译jsx代码
             ```
              cnpm install babel-loader -D
              cnpm install @babel/core -D
              cnpm install @babel/preset-env -D
              cnpm isntall @babel/preset-react -D
             ```
          + 2.react.config.js中 module: { rules:[ ]}内
            ```js
              //在处理js模块时，为了让编译速度更快，用exclude忽略node_modules包
            { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
            ```
          + 3.根目录下创建babel.config.js
            ```js
              module.exports = {
                //preset: 是Babel对不同版本的JS语法的一种支持编译。 ES6 JSX ts CoffeeScript
                //plugin: 是用于某些特殊语法的支持和编译
                "presets": ["@babel/preset-env","@babel/preset-react"] //编译大多数的es6、jsx
            }
            ```
    + 五、ESlint:检测JS语法规范
        + 1.安装
           ```
            cnpm install eslint-webpack-plugin  -D
            cnpm isntall eslint -D
           ```
        + 2.react.config.js中引入， plugins: []内
          ``` js
          const ESLintPlugin = require('eslint-webpack-plugin')

           new ESLintPlugin({
                exclude: ['node_modules'],
                fix: true, //自动修复错误，不建议使用
           })
          ```
        + 3.根目录下创建.eslintrc.json
           ```json
           {
            "parserOptions": {
                "ecmaVersion": 6,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true
                }
              },
              "rules": {
                  "semi": "error"//不加分号，报错  off:关闭 wran:警告 error：报错
                  // "no-console":2 //0:不报错 1：警告 2：报错
              }
            }
           ```
          + 4.如果要忽略eslint错误，可以在需要忽略的代码后面添加注释//eslint-disable-line，如果是一大块代码可以用注释包裹：/*eslint-disable*/ ... /*eslint-enable*/
       + 六、区分开发环境和生产环境 
          + 1.安装(cross-env:在node.js环境进程中添加环境变量)
             ```
              cnpm isntall cross-env -D
             ```
          + 2.package.json中
            ```
              "scripts": {
                "build": "cross-env NODE_ENV=production webpack --config react.config.js",
                "start": "cross-env NODE_ENV=development webpack serve --config react.config.js"
            }
            ```
          + 3. react.config.json中：判断进程的环境是生产环境还是开发环境，生产环境和开发环境执行的代码不同
            ```js
            const isDev = process.env.NODE_ENV === 'development'
            ```
            + 代码初始是生产环境的配置，经过判断后如果是开发环境，则将与生产环境中不同的代码覆盖。代码详情见react.config.js文件
        + 七、resolve:
          + 1.定义绝对路径@：通过alias
          + 2.定义文件后缀名省略：extensions
          ```js
          resolve:{
            alias:{
              '@':path.resolve(__dirname,'src')
            },
             extensions: ['.js', '.jsx', '.css', '.vue', '.ts', '.scss'] //配置省略.xx后缀
          }
          ```
        + 八、source-map小警告：在开发环境配置中添加config.devtool='source-map'
        + devtool作用:当程序报错时，会显示错误在源码中的位置， 否则显示在编译后代码最后的位置
### React
+ mvvm模式
+ 1.安装
  ```
  cnpm isntall react -S
  cnpm install react-dom -S

  ```
+ 2.在src内新建App.js
  ```js
  import React from 'react'
  //jsx语法
  const ele = <h1>Hello React 2020</h1>
    //类组件定义
    /* class App extends React.Component {
        render() {
            return ele
        }
    } */
    //函数式组件，组件定义
      function App(){
          return ele
      }
      export default App
  ```
+ 3. main.js中挂载
  ```js
  import React from 'react'
  import ReactDom from 'react-dom'
  import App from './App'
  //render的第一参数，必须是一个React组件；第二个参数是真实的DOM节点
  ReactDom.render(<App />,document.getElementById('root'))
  ```
#### JSX
+ 什么是JSX：JSX=Javascript XML 是一种语法糖
+ 为什么要使用JSX？在React开发中，JSX语法是可选的，但是React官方建议使用JSX，使用JSX写代码，代码更加优雅，便于维护。
+ JSX是变量，对象，React元素
+ 使用JSX必须要引入React
+ JSX中可以使用表达式，但要使用 {} 包起来
+ JSX可以嵌套
+ JSX中，注释内容也要使用{/**/}包裹
+ JSX中，默认可以防注入攻击(XSS)
+ JSX可以复用
> React类名及其组件的使用，都要大驼峰命名法
#### Props
+ props是父子之间的纽带
+ 特点：
  + 它是只读的
  + 不要把props赋值给state,反正同理
  
+ 在类组件中
+ constructor(props){ }:构造器，也是一个生命周期；当React类被实例化变成React元素(JSX)时调用
  + super(props):调用父类的构造器；必须是constructor中的第一步
  + this.state={ }:状态，相当于是vue中的声明式data；特点:当state变化时，视图自动更新
+ render(){}:是类组件中必须的一个声明周期；它表示在真实DOM中将要渲染的视图结构
  + render(){}里面可以do something:比如解构赋值
  + render(){}最后面return():可以把state变量渲染到真实的Dom上；可以把props变量渲染到真实的Dom上；在JSX中，可以直接渲染一个由React元素构成的数组变量；

#### 类组件
+ 用class关键字来定义组件
+ 特点：
  + 它有state
  + 它有生命周期
  + 它有上下文，ref，this等特性
  + 与函数式组件相比性能较差
#### 函数式组件
+ 用function关键字或箭头函数定义的组件
+ 特点：
  + 没有state,也被称为"无状态组件"
  + 没有生命周期
  + 没有上下文，ref,this特性
  + 与类组件相比，性能更高
#### 事件
    ```
      addHandle(arg1,arg2,e){
          this.setState((state,props)=>({num:state.num+1}))
    }

    {/*绑定事件的第一种方法，使用bind(this)来改变this指向 */}
    <button onClick={this.addHandle.bind(this,1,2)}>+</button>
      {/*绑定事件的第二种方法，使用箭头函数，它的this指向所在类的实例 */}
    <button onClick={(e)=>this.subHandle(1,2,e)}>-</button>
    ```
#### state
+ setState()是React中专门用于更新VM，触发diff运算，更新视图
+ setState()默认是异步的，但在定时器中却是同步的
+ setState(fn1,[fn2])fn1必须返回一个新的state,fn2表示更新state完成
+ setState({bol:true}) //不需要旧值运算时，只是直接更新时
+ 当有多个setState执行时，React会自动将其合并，只执行一次diff运算，一次视图更新
#### 条件渲染
+ v-if:显示隐藏，直接移除dom
  + 只有两个元素需要执行条件渲染，建议使用三元表达式
  + 只有两个以上元素需要执行条件渲染，建议使用&&来实现
+ v-show:显示隐藏，通过display属性
  + 从动态 className 实现条件渲染
  + 从动态 style 实现条件渲染
#### 列表渲染
+ 列表循环加key实际上是一种性能优化。加了key，数组就固定住了，不会乱
+ 可以直接通过map遍历渲染(可以直接渲染，也可以封装后渲染)
+ 如果需要二次转换处理时，可以构造一个数组来承载JSX对象，通过map遍历操作处理，在数组中push。(可以直接渲染，也可以封装后渲染)
#### 表单
+ 表单：单向绑定
+ React中表单数据是单向绑定的，要想让视图变化，state数据必须要改变
+ 受控表单：表单的 value/checked 由 state 完全控制
+ 非受控表单：表单的 value/checked 不受 state 完全控制
#### 生命周期
+ 三个阶段：
  + 装载阶段(3)
  + 更新阶段(2)
  + 销毁阶段(1)
+ 一、装载阶段 执行顺序：constructor/render/componentDidMout
+ constructor
  + 构造器
  + super必须是第一行代码，声明式变量定义在this.state中
  + 构造器中，props和state不要交叉赋值，它们两个没有任何关系
  + 构造器中不要执行this.setState()
  + 构造器中不要开启异步任务，比如调接口、定时器等
+ render
  + 它是React类组件中唯一一个必须的生命周期
  + 它在装载和更新阶段都会执行
  + 当state发生变化时，render进行二次渲染，是根据diff运算的脏节点来更新界面，不是全部更新
  + 在render的return之前可以进行业务逻辑操作
  + 在render()或者自定义的渲染函数中，不能使用this.setState()
+ componentDidMount
  + 它表示DOM初始化已完成，所有虚拟DOM都已经被渲染成真实的DOM
  + 一般在这里可以进行调接口、定时器、DOM操作
+ 二、更新阶段：shouldComponentUpdata、render、componentDidUpdata
+ shouldComponentUpdata
    + 这是一个开关，用于控制是否更新
    + 询问React，我该更新界面？
    + 这个生命周期用于性能优化，我们可以精准地控制某些state变量发生变化时不更新页面
    + 实际工作中很少用，我们会用函数式组件(PureComponent)作为替代解决
+ componentDidUpdate
  + 表示DOM已经更新完成
  + 该生命周期中，同样不要使用 this.setState
+ 三、销毁阶段
+ componentWillUnmount
  + 相当于Vue中的beforeDistroy
  + 关闭长连接，定时器，清缓存
+ 小结：React的生命周期分为三个阶段：装载阶段，更新阶段，销毁阶段。在装载阶段常用的生命周期有三个，counstructor,render,componentDidMount。在更新阶段有两个，shouldComponentUpdate，render,componentDidUpdate。在销毁阶段有一个，componentWillUnmount。
  + 更新阶段React做了什么？:更新阶段setState触发state更新首先 1.生成一个虚拟DOM，这时候内存中有两个虚拟DOM了，2.diff运算对这两个虚拟DOM进行遍历，找出变化的最小节点然后标记出来变成脏节点，3.找到后patch给其他的，执行真实的DOM操作。
#### 父子之间通信
+ 父传子：使用自定义属性props（可以做任何类型的数据，包括React元素、方法处理器）
  + 父组件中直接在标签身上传值，直接写就行。
  + 子组件中通过props接收。把父组件传来的值全部解构处出来，就可以直接用了。(注意：函数式组件中没有this)
+ 子传父：使用自定义事件（在React中，约定俗成，自定义事件写成 onAaaBbb 这样）
  + 父组件中通过自定义事件接收子传过来的值
  + 子组件中通过调用父组件的自定义事件给父组件传值。(接收父组件自定义事件时也需要props解构后再调用)
#### 状态提升
+ 当兄弟组件之间需要共享一些状态(数据)时
+ 我们的做法是把这些需要共享的状态定义在它们共同的父组件中去
+ 这种做法叫做状态提升
### Context 上下文
+ 在根组件上注入数据，然后组件树中所有组件节点都可以访问
+ 特点：数据只能单向传递，即从根组件向后代组件传递
+ 应用实践：状态管理就是借助上下文来实现数据的传递
+ React.createContext()
+ Context.Provider
+ Context.Consumer
### 高阶组件
+ 作用：是React中业务逻辑复用的一种方案
+ 是一种基于React组合特性而得来的一种设计模式，软件开发经验
+ 高阶组件也被称为高阶函数，纯函数，容器组件
+ 怎么用：业务逻辑用高阶函数封装，参考roleHoc.js--->哪里需要用就引入到哪里，就可以用啦，this.props身上就有那些数据或方法了
+ 粗粒度的权限管理、细粒度的权限管理(不同用户进入同一个界面，有不同的按钮或者其它显示)
+ 如何在当下环境支撑ES6装饰器语法：
  + 安装 @babel/plugin-proposal-decorators / @babel/plugin-proposal-class-properties
  + 安装 babel-eslint，它可以配合 eslint 一起工作
  + 配置babel，参考 babel.config.js 文件
  + 配置eslint，参考 .eslintrc.json 文件
### prop-Types
+ 验证Props数据类型
+ 安装：cnpm install prps-type -S
+ 引入使用，参考TeatType.js
### Fragement
+ 碎片
+ render里面可以用碎片写法替代根节点div
+  <React.Fragment> </React.Fragment>
+ 简写 :<></>
### HOOK
+ 一套API，用于解决函数式组件中缺少类组件相关特性的问题
+ 无状态组件，只有一个好处----性能高
+ 天然缺点：没有this,没有state状态，没有生命周期，没有上下文，没有ref
+ 但是在工作实践中，要在函数式组件中使用类组件的相关特性，使用 HOOK API 来解决
+ 使用：参考TestHook.js
  + 引入
    ```js
     import React,{useState,useEffect} from 'react'
    ```
+ useState:定义一个声明式变量,当变量变化时视图自动更新
  + 如：声明式变量count;setCount()是一个方法，它专门用于改变count的;uerState()内是count的值;定义好后直接在render中使用{count};
   ```js
      let [count,setCount]=useState(1000)
   ```
+ useEffect(fn,[]):使用React的生命周期
    + 在同一个函数式组件中，可以使用多次useEffect
    + 建议在同一个useEffect中，只做一件事
    + 第一个参数是函数，它必须给一个return
    + 第一个参数中、return外相当于componentDidMount;renturn内相当于 componentWillUnmount、当组件销毁时，会被调用
    + 第二个参数是伪数组，相当于 componentDidUpdate
      + componentDidUpdate,当state发生变化，会执行setState,没完没了，第二个参数千万不要填自己
    + 第二个参数变化时，第一个函数中如果有setXxx也会执行
    + 调接口、定时器、更改数据时可以在里面用
### react-router-dom
+ 官网：https://reactrouter.com/web/guides/quick-start
+ 安装：cnpm install react-router-dom -S
+ 常用组件：HashRouter/BrowserRouter, Route, NavLink/Link, Redirect, Switch
+ 高阶组件：withRouter
+ 编程式路由跳转、路由动态传递
+ HashRouter/BrowserRouter：在App.js中包裹整个渲染的代码。同vue,一个是hash模式一个是history模式,二选一；一个地址有#,一个没有
+ NavLink/Link：点击跳转的链接，页面显示是a标签；参考Sider.js; 
+ Route：那把椅子;当NavLink中to的url和Route.path匹配成功，显示当前配对成功的Route.component；参考main.js; ；
+ Switch：用于把Route数组组件包裹起来，当URL变化时从上到下进行匹配，匹配成功就终止; 当Route数组被包裹起来，建议给 Route都加上exact属性。在生成 Route 数组时，其外层不能包裹任何其实HTML节点，它的直接父组件只能是 Switch
+ Redirect:重定向；  <Redirect from='/*' to='/' />
+ 没有被Route组件直接包裹的React组件中，是没有路由API的。那怎么办呢?参考Header.js
  + 在类组件中，只能使用 withRouter 来解决问题:有两种写法：装饰器的写法，或者 ES5函数调用的写法
  + 在无状态组件中，可以使用 withRouter，也可以使用 useHistory来解决问题。
    + 使用usehistory：直接在组件中 cosnt history =useHistory就可以有路由了
    + 使用 withRouter ：withRouter(props=>{}),包裹整个代码，props身上就有了
  + withRouter 是一个高阶组件，让那些没有被Route组件直接包裹的React组件拥有路由API
  + useHistory 是ReactRouter提供的Hooks API，帮助我们在无状态组件中使用路由API
+ useParams :用于接收URL参数
### 代码分割（路由懒加载）
+ react官网中讲的不怎么好，直接看react-router-dom官网-->web-->GUIES-->code spliting
+ 使用：
  + cnpm install @loadable/component -S
  + import loadable from '@loadable/component'
  + 把所有路由匹配组件都写成 const Home = loadable(()=>import('./Home.js'))
  + 如果报了 动态import 语法错误，请安装这个babel插件
  + cnpm install @babel/plugin-syntax-dynamic-import -D
  + 在 babel.config.js 中添加一个plugins配置，重启项目即可
+ 小结：代码分割是性能优化的一种解决方案。比如我们的路由系统中有100个组件，我们在react项目启动时不要对这100个组件都进行编译，只编译当前URL对应的组件，这就需要用到代码分割功能。
###  状态管理
+ 状态：就是数据，状态管理工具，是用来对应用程序中数据进行科学的管理；
+ 最早出现状态管理思想是Flux,Flux只是一套数据流管理的指导思想、设计模式
#### mobx+ mobx-react 
+ 小项目中使用
+ mobx:用于定义store
+ mobx-react:mobx-react 这个库用于把 mobx 和 react 组件连接起来;借助了react的上下文和高阶组件
+ 安装：
  + cnpm install mobox -S
  + 在src中新建 store/index.js,代码如下：
  ```js
  import { makeAutoObservable }from 'mobox'
  class Store {
    constructor(){
      makeAutoObservable(this)
    }
    msg = 'Hello'
    changeMsg(payload){
      this.msg = payload
    }
  }
  export default new Store()
  ```
  + cnpm install mobox-react -S
  + 在APP.js中代码如下：
  ```js
   import { Provider }from 'mobox-react'
   import store from './store/index.js'
   export default function App(){
     return(
       <Provider store={store}>
         <Layout>
        </Provider>
     )
   }
  ```
  + 在页面组件中代码如下：
  ```
  import { inject,observer }from 'mobx-react'
  export default inject('store')(observer(props=>()))

  ```
  + 在页面中使用props.store 来访问 共享的数据和 action方法
+ Provider:借助上下文来实现
+ action:行为，改变可观察的数据
+ observable:数据
+ computed：计算属性
+ inject('store')()：把Provider上下文中的store数据添加到组件中 ；借助了高价组件
+ observer():基于ES6 Proxy 来实现数据劫持的，当store中数据变化时，页面组件自动更新 借助了高价组件；
+ modules分模块：根据不同的任务分成不同的模块；可参考todo.js
  + 1. store/module.todo.js:
   ```js
     import{makeObservable,observable, action,computed}from 'mobx'
     export default class TodoStore{
       constructor(){
          makeObservable(this,{
            list:observable,
            addTask:action,  
            delTask:action,
            total:computed
        })
       }
       list=[]
       addTask(payload){} 
       delTask(payload){}
      get total(){  return this.list.length }  //相当于是 vuex中的计算属性getters
     }
     export default new Store()
   ```
  + 2.store/index中引入后在cosntructor中new一个实例
    ```js
     import TodoStore from './module/todo'
     this.todo=new TodoStore
    ```
  + 3.在页面组件代码中使用；同上，引入，注入等；使用通过props.store.todo来使用
#####  axios的封装
+ 1.安装：cnpm isntall axios
+ 2.src/utils/axios.js:
  + 引入axios-->在npm官网中找axios，复制axios.Creacte中的代码进行更改(baseURL：如果需要跨域一般写本地地址http://localhost:8888)-->复制interceptors中的代码进行更改(请求拦截，响应拦截；注意讲前面的axios改为instance)-->抛出
+ 3.封装api.js  
  + 引入写好的axios--->写代码(参考api.js)注意url:写请求地址中第一个/与第一个问号之间的代码
+ 4.react.config.js中解决跨域： 在config.devServer中添加proxy(参考react.config.js)
#### redux+redux-reactreact.config.js
+ 大项目中使用
+ redux 只是定义了store
+ react-redux 这个库用于把 mobx 和 react 组件连接起来
## Ant desigin
+ 安装
  ```
  cnpm install antd --save
  ```
+ main.js中引入样式
  ```js
    //引入antd的样式wenj
    import 'antd/dist/antd.css';
  ```
+ 1.Layout布局：引入-->复制粘贴代码，理解每一行，根据需求更改-->注意调样式；打开浏览器慢慢调
+ 2.Menu菜单
+ 3.ICON：
  + 安装： cnpm install @ant-design/icons -S
  + 在view/index中引入；注意：它是类，要转成React元素；icon=类名(不要加'')
  + Sider.js中icon={<ele.icon />}
+ less:安装less
  ```
  cnpm install less -D
  cnpm install less-loader -D
  ```
+ 定制主题：Ant-design官网-->文档-->定制主题
  + 根据文档步骤一步步来：先更改react.config.js文件-->main.js中引入：import 'antd/dist/antd.less'

