module.exports = {
    //preset: 是Babel对不同版本的JS语法的一种支持编译。 ES6 JSX ts CoffeeScript
    //plugin: 是用于某些特殊语法的支持和编译
    "presets": ["@babel/preset-env","@babel/preset-react"], //编译大多数的es6,jsx语法
    "plugins": [
        ["@babel/plugin-transform-destructuring"],
        // 下面两个插件的作用是编译装饰器语法
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        ["@babel/plugin-syntax-dynamic-import"]
      ] 
}