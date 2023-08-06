import { defineStore } from 'pinia'

export const useisPullUpLoad = defineStore('pull',{
  state:()=>({
    isPullUpLoad:false,
    isEnd:false,
    showShop:[]
  })
})


export default useisPullUpLoad

