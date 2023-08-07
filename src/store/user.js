import { defineStore } from 'pinia'
import {login,checkLogin,loginout} from '@/api/login'
import router from '@/router'
import { ElMessage } from "element-plus";
import { getSession,setSession,removeAllItem, getLocal} from '@/api/storage'

export const useuser = defineStore('USER',{
  state:()=>({
    DirectorySwitch:0,
    //当前时间戳
    nowtime:0,
    //到期时间戳
    future:0,
    //用户名
    Username:''
  }),
  actions:{
    loginFn(value){
        console.log(value)
        login(value).then((data)=>{
            console.log(data)
            if(!data.code){
              router.push('/')
            }else{
              ElMessage.error('登录失败')
            }
        })
    },

    checkLoginFn(){
        return new Promise((res,rej)=>{
            checkLogin().then(({data})=>{
                
                    res(data)
                
            })
        })
    },

    Loginout(){
      loginout().then((data)=>{
        console.log(data)
      })
    }



  },
 

   


})


export default useuser