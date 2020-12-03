import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
const MusicRow = props =>{
    let  { music } =props

    const history =useHistory()

    const skipToDetail = (ele)=>{
        history.push('/music/detail/'+music.id+'/'+music.name)
    }
    return (
        <div>
            <span>{music.id}</span>
            <span>-----</span>
           <span>{music.name}</span>
           <span>-----</span>
           <span onClick={ skipToDetail}>跳转</span>
        </div>
    )
}
MusicRow.prototype ={
    music:PropTypes.object.isRequired
}
export default MusicRow