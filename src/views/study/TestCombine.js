import React, { Component } from 'react'

const QfModal =props =>{
    const ConfirmBtn=()=>(
        <span onClick={()=>props.onOK()}className='info'>{props.okText||"确定"}</span>
    )
    const CancelBtn =()=>(
        <span onClick={()=>props.onCancel()}>取消</span>
    )
    const DeleteBtn = ()=>(
        <span onClick={()=>props.onDelete()} className='delete'>删除</span>
    )
    //动态渲染buttons
    function renderBtns(){
        switch(props.type){
            case 'confirm':
              return (
                  <div>
                    <ConfirmBtn />
                    <CancelBtn/>
                  </div>
              )
            break
            case 'delete':
                return (
                    <div>
                         <CancelBtn/>
                        <DeleteBtn /> 
                    </div>
                )
            break
            default:
                return (
                    <div>
                     
                     <ConfirmBtn />
                    </div>
                )
        }
    }
    return (
        <div className='qf-modal' style={{width:props.tip?'500px':'410px'}}>
          {
              props.tip &&   <div className='qf-modal-header'>
                <span>{props.tip}</span>
                <span>x</span>
               </div>
          }
          <div className='qf-modal-content'>
             {props.children}
          </div>
          <div className='qf-modal-footer'>
            {renderBtns()}
          </div>
        </div>
    )
}
export default class TestCombine extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    okHandle(){
        console.log('你点击了确定按钮')
    }
    cancelHandle(){
        console.log('你点击了取消按钮')
    }
    deleteHandle(){
        console.log('你点击了删除按钮')
    }
    render(){
        return (
            <div>
                <h1>测试组合</h1>
                {/* 确认框 */}
                <QfModal 
                  tip="编辑"
                  type="confirm"
                  onOK={()=>this.okHandle()}
                  onCancel={()=>this.cancelHandle()}
                  >
                    <div>
                        <span>用户名：</span>
                        <input type='text'/>
                    </div>
                    <div>
                        <span>密码：</span>
                        <input type='password'/>
                    </div>
                </QfModal>
                {/* 删除框 */}
                <QfModal 
                  tip="删除"
                  type="delete"
                  onCancel={()=>this.cancelHandle()}
                  onDelete={()=>this.deleteHandle()}
                  >
                   <p>你确定要删除人家吗~~~~~~~~~~~？</p> 
                </QfModal>
                <QfModal 
                  tip="删除" 
                  onOK={()=>this.okHandle()}
                  >
                   <p>你确定要删除人家吗~~~~~~~~~~~？</p>
                   
                </QfModal>
                <QfModal
                   onOK={()=>this.okHandle()}
                   okText="change?"
                >
                   <p>你确定要改吗~~~~~~~~~~~？</p>  
                </QfModal>
                <QfModal 
                  type="delete"
                  onCancel={()=>this.cancelHandle()}
                  onDelete={()=>this.deleteHandle()}
                  >
                   <p>你 确定 要 删除 人家 吗~~~~~~~~~~~？</p> 
                </QfModal>
                <QfModal 
                 type="confirm"
                 onOK={()=>this.okHandle()}
                 onCancel={()=>this.cancelHandle()}
                 >
                  <p>你确定要删除人家吗~~~~~~~~~~~？</p> 
               </QfModal>
            </div>
        )
    }
}