import React,{Component} from 'react'


//表单：单向绑定
//React中表单数据是单向绑定的，要想让视图变化，state数据必须要改变
// value/checked & onChange 必须成双成对，一起使用

//受控表单：表单的 value/checked 由 state 完全控制
//非受控表单：表单的 value/checked 不受 state 完全控制

let age=''

export default class TestForm extends Component{
    constructor(props){
        super(props)
        this.state={
            name:"2009",
            desc:'',
            level:'',
            gender:1,
            favCheckedArr:['A','B','C']
        }
    }
    

    getAge(e){
        console.log('age',e.target.value)
        age=e.target.value
    }
    submitUnCtrlForm(){
        //ref 是React中也有，它是一种快捷访问，操作DOM的方式
        // 尽可能减少 DOM/ ref 操作
         const data={
             name:document.getElementById('text').value,
             pass:this.refs.pass.value,
             age
         }
         console.log('非受控表单提交',data)
    }

    //受控表单，手动选值
    change(e,key){    
        console.log('爱好',e.target.value,e.target.checked)
        switch(key){
          case ' favCheckedArr':
            /* if(e.target.checked){
            this.setState(state=>{
                state.favCheckArr.push(e.target.value)
                return { favCheckArr:state.favCheckArr}
            })
        }else{
            this.setState(state=>{
                return { favCheckedArr:state.favCheckArr.filter(ele=>ele!==e.target.value)} 
            })
          
        } */
        this.setState(state=>({ favCheckedArr:e.target.checked?[...state. favCheckedArr,e.target.value]:
            state. favCheckedArr.filter(ele=>ele!==e.target.value) }))
            break
          default:
            this.setState({[key]:e.target.value})  //对象的key是一个变量，必须用[]包裹
        }
     
      
        // console.log('表单',e.target.value)
        // 
    }
    submitCtrlForm(){
        console.log('提交受控表单',this.state)
    }
    render(){
        let { name,desc,level,gender,favCheckedArr}=this.state
        let levelArr = [
            {id:1,level:'高中',level_en:'a'},
            {id:2,level:'大专',level_en:'b'},
            {id:3,level:'本科',level_en:'c'},
            {id:4,level:'硕士',level_en:'d'},
            {id:5,level:'博士',level_en:'e'}
        ]
        let favArr = [
            {id:1,fav:'篮球',fav_en:'A'},
            {id:2,fav:'跑步',fav_en:'B'},
            {id:3,fav:'游泳',fav_en:'C'},
            {id:4,fav:'吃饭',fav_en:'D'},
            {id:5,fav:'睡觉',fav_en:'E'}
        ]
        //二次处理
        favArr.map((ele,idx,arr)=>{
          arr[idx].checked=favCheckedArr.includes(ele.fav_en)

          
        })
        return(
            <div>
                <h1>测试表单</h1>
                <hr/>
                 
                 {/* 以下三种非受控表单不要用，会被揍滴 */}
                <input type="text" id="text"/><br/>
                <input type="password" ref="pass" /><br/>
                <input type="age" onInput={(e)=>this.getAge(e)} /><br/>
                {/* 在React中，有且仅有以下一个可以放心使用的非受控表单，文件上传返回的是二进制流，不需要受控 */}
                <input type='file' /><br/>
                <button onClick={()=>this.submitUnCtrlForm()}>提交非受控表单</button>

                <hr/>
                 {/* React中，除文件上传以外，其它表单都要使用受控表单 */}
                 <span>用户名:</span>
                 <input type='text' value={name} onChange={(e)=>this.change(e,'name')}/><br/>
                 <span>个人简介：</span>
                 <textarea cols="30" rows='10' value={desc} onChange={(e)=>this.change(e,'desc')}> </textarea><br/>
                 <span>选择学历：</span>
                 <select value={level} onChange={(e)=>this.change(e,'level')}>
                     {
                        levelArr.map(ele=>(
                        <option
                          value={ele.level_en}
                          key={ele.id}
                          >
                           {ele.level}
                          </option>))
                     }
                 </select>
                 <hr/>
                 <span>选择性别：</span>
                 {/* name字段，用于把radio变成一组 */}
                 {/* value字段，用于给每个单选项加一个唯一值，它间接控制勾选状态 */}
                 {/* checked用于控制radio的勾选状态 */}
                 {/* onChange和checked是成对的关系，在onchange中手动选择 */}
                 {/* 触发change事件：value的值赋给gender，表示点击了哪一个，那一个的gender的值就等于value，checked为true，显示勾选 */}
                 <input 
                   name='gender' 
                   type='radio'
                   value='1'
                   checked={gender==1}
                   onChange={(e)=>this.change(e,'gender')}
                   /><span>男</span>
                 <input 
                   name='gender'
                   type='radio'
                   value="2"
                   checked={gender==2}
                   onChange={(e)=>this.change(e,'gender')}
                   /><span>女</span><br/>
                    
                 <hr/>
                 <span>选择你的爱好：</span>
                 {
                     favArr.map(ele=>(
                         <span key={ele.id}>
                             <input 
                             value={ele.fav_en}
                              type='checkbox'
                              checked={ele.checked}
                              onChange={(e)=>this.change(e,' favCheckedArr')}
                              />
                             <span>{ele.fav}</span>
                         </span>
                     ))
                 }
                   <br/>
                 <button onClick={(e)=>this.submitCtrlForm()}>提交受控表单</button>
                
             
              
            </div>
        )
    }
}
