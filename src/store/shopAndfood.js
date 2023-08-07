import {useCookies} from 'vue3-cookies'
import { defineStore } from 'pinia'
import {getLocal,setLocal} from '@/api/storage'

const {cookies} = useCookies()

const user = getLocal('__user__','')
export const useshopfood = defineStore('shopfood',{
  
  state:()=>({
    showFood:[],
    copyshop:[],
    showshopLoading:false,
    showshopEnd:false,

    Disappear:false,
    
    foodnumber:0,
    foodprice:0,
    //地址
    Address:[],
    //购物数量
    shopNum:0,
    //购物总价
    shopTotal:0,
    //单类购物数量
    singleShopNum:{},
    //购物车列表
    shoppingCart:[],
    //购物车全部
    shoppingAll:{},
    //购买历史
    historyshop:[],
  }),
  getters:{
    //购物总价
    oldshopTotal:()=>{
      
      const m = cookies.get(`${user}`)
      return (p)=>{
        if(m){
          const a = Object.hasOwn(m,p)
      
        return a ? m[p][0].priceTotal : 0
        }else{
          return 0
        }
        
      }
     
       
    },
    //购物数量
    oldshopNum:()=>{
      const m = cookies.get(`${user}`)
      return (p)=>{
        if(m){
          const a = Object.hasOwn(m,p)
          return a ? m[p][0].NumTotal : 0
        }else{
          return 0
        }
      }
      
  
    },
    //购物车列表
    oldshoppingCart:()=>{
      const m = cookies.get(`${user}`)
      return (p)=>{
        if(m){
          const a = Object.hasOwn(m,p)
          return a ? m[p] : []
        }else{
          return []
        }
      }
      
    },
     //单类购物数量
     oldSingleShop:()=>{
      const m = cookies.get(`${user}`)
      return (p)=>{
        if(m){
          const a = Object.hasOwn(m,p)
          let b = {}
          for(let i = 0;i < 15;i ++){
            b[`${i}`] = 0
          }
          console.log(b)
          // console.log(m[`${p}`][0].SingleShop)
          return a ? m[p][0].SingleShop : b
        }else{
          return b
        }
      }
    },
    //购物车全部
    oldshoppingAll:()=>{
      const m = cookies.get(`${user}`)
      return ()=>{
        if(m){
         
          console.log(m)
          return m
        }else{
          return {}
        }
      }
    }
   

  }
})


export default useshopfood