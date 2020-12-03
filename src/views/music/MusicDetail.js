import React from 'react'

import { useParams } from 'react-router-dom'
export default props => {
    let {id , name}=useParams()
    return (
      <div>
        <h1>音乐详情</h1>
        <h1>{id}</h1>
       <h1>{name}</h1>
      </div>
    )
  }