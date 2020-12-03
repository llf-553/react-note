//前端项目都运行在node.js环境中，这个配置文件是项目运行或打包时执行的
//它的语法是CommonJs模块化语法

//项目文件都与main.js关联起来，从入口进入，一层一层运行把它变成浏览器能够识别的玩意后从出口输出到dist这个文件夹中
const path = require('path')
    // 用于把打包后的js/css等资源，自动插入到public/index.html中
const HtmlWebpackPlugin = require('html-webpack-plugin')
    // 在每次执行npm run build时，自动帮我们清理掉dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
//webpack最新的ESlint的使用方式，eslint-loader已经被被废弃
const ESLintPlugin = require('eslint-webpack-plugin')

console.log('................', process.env.NODE_ENV) //process是nodjs中自带的进程

const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: 'production',
    //入口
    // entry: path.resolve(__dirname, './src/main.js'),
    entry: {
        //给入口文件起个名字叫app
        app: path.resolve(__dirname, './src/main.js')
            //可以写绝对路径或相对路径
    },
    //出口
    output: {
        filename: '[name]. [chunkhash].js', //将代码中一堆文件打包成一捆,打包好的文件名第一个是name,第二个是hash值
        path: path.resolve(__dirname, './dist'), //只能写绝对路径
        publicPath: ''
    },
    plugins: [
        //把打包完的静态资源和指定的html关联起来
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            title: 'React'
        }),
        //每次打包前自动清理掉dist目录中残留的文件
        new CleanWebpackPlugin()
    ],
    //loaders
    //在webpack眼中一切皆模块
    module: {
        //webpack要根据你定义的规则，来编译各种不同后缀的模块
        rules: [
            { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //在main.js中导入的文件是以.css结尾的
            //node-sass是sass编译器，它的作用是把sacc-loader加载进来的scss文件编译成css文件
            // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
            //图片编译，file-loader
            { test: /\.(png|svg|jpg|jpeg|gif)$/, use: ['file-loader'] },
            //babel-loader用于加载.js文件，并交给@babel/*编译器
            //在处理js模块时，为了让编译速度更快，用exclude忽略node_modules包
            { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
            //eslint-loader用于加载.js文件，交给eslint这个库来检测
            //enforce:'pre'：当代码变化时，先检测代码规范，只有当代码满足规范时，才执行其它的后置loader处理
            // { test: /\.js$/, use: ['eslint-loader'], exclude: /node_modules/, enforce: 'pre' },
            //less配置
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                  }, 
                  { loader: 'css-loader'},
                  {loader: 'less-loader',
                  options: {
                    lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                    modifyVars: {
                      'primary-color': '#59b4fb',
                      'link-color': '#1DA57A',
                       'border-radius-base': '2px',
                    },
                     javascriptEnabled: true,
                     },
                     },
                  },
                 
                ]
            }


        ]
    },
    resolve: {
        alias: { //配置@路径
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.css', '.vue', '.ts', '.scss'] //配置省略.xx后缀
    }

}

if (isDev) {
    //开发环境的特殊配置
    config.mode = 'development'
    config.devtool = 'source-map'  //当程序报错时，会显示错误在源码中的位置，否则显示在编译后代码的位置
    //默认情况下，代码检测是由eslint这个包进行检测
    // babel-eslint 它可以配合 eslint 一起工作，来检测代码规范
    config.plugins.push(
            new ESLintPlugin({
                exclude: ['node_modules'],
                // fix: true, //自动修复错误，不建议使用
            })
        )
    //本地服务
    //要配合webpack-dev-server 一起使用
    config.devServer = {
        port: 8888, //开启的端口号
        open: true,
        hot: true, ////实现HMR(Hot Module Replacement)
        contentBase: "./public", //指定本地服务的静态资源目录
        //当本地项目运行时，发生errors错误，以覆盖层的方式遮住试图
        overlay: {
            errors: true
        },
        proxy:{
            "/soso":{
             target:'https://c.y.qq.com/',
             changeOrigin:true

            }
        }
    }
}

module.exports = config