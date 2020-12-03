import {
  makeObservable,
  observable,
  action,
  computed
}from 'mobx'
import {fetchQqMusic} from '@/utils/api'

export default class musicStore{
    constructor(){
        makeObservable(this,{
          list:observable,
          changeList:action
        })
        
    }
    list = []
    changeList(payload){
      fetchQqMusic(payload).then(res=>{
        this.list=res.song.list
      })
    }
}