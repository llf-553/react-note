import React from 'react'

import ThemCtx from '../theme'


export default function themHoc(WrappedComponent){
    return class extends React.Component{
        render(){
            return (
              <ThemCtx.Consumer>
                  {
                      (value)=>(
                          <div style={{color:value.color,background:value.background}}>
                              <WrappedComponent />
                          </div>
                      )
                  }
              </ThemCtx.Consumer>
            )
        }
    }
}