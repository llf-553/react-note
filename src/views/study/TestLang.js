import React from 'react'

//子组件
function QfLang(props){
    let {LangList,value,onChange }=props

    function langClick(ele,e){
        // console.log('langClick',ele,e)
        e.target.value=ele.lang
        //调用父组件传递过来的自定义事件
        onChange(e)
    }
    return (
        // <div>我是子组件</div>
        <div className='qf-lang'>
         {
            LangList.map(ele=>(
                <span 
                  key={ele.id}
                  className={value===ele.lang?'on':''}
                  onClick={(e)=>langClick(ele,e)}
                >
                 {ele.lang_zh}
                </span>
            ))
         }
        </div>
    )
}

// 父子组件之间通信
// 父传子，使用自定义属性props（可以做任何类型的数据，包括React元素、方法处理器）
// 子传父，使用自定义事件（在React中，约定俗成，自定义事件写成 onAaaBbb 这样）
export default class TestLang extends React.Component{
    constructor(props){
        super(props)
        this.state={
            langList:[
                { id: 1, lang_zh: '中文', lang: 'zh' },
                { id: 2, lang_zh: '英文', lang: 'en' },
                { id: 3, lang_zh: '日语', lang: 'jp' },
                { id: 4, lang_zh: '法语', lang: 'fr' },
                { id: 5, lang_zh: '韩语', lang: 'kr' }
            ],
            langValue:'zh'
        }
    }
    langChange(e){
        // console.log('父组件中的 lang change 被触发了',e.target.value)
        this.setState({langValue:e.target.value})
    }
    render(){
        let { langList,langValue}=this.state
        const arr=langList.filter(ele=>ele.lang===langValue)
        return(
            <div>
                <h1>测试父子组件之间传值</h1>
                <QfLang LangList={langList} value={langValue} onChange={(e)=>this.langChange(e)}/>
               <h1>当前你选择的是：<span>{arr[0].lang_zh}</span></h1>
            </div>
        )
    }
}