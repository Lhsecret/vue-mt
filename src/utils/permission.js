import router from '@/router'
// import { useRouter } from 'vue-router'
import {useuser} from '@/store/user'
import {watch} from 'vue'
import {Renewal} from '@/api/login'
import {getLocal,setLocal} from '@/api/storage'
import { getSession,setSession,removeAllItem} from '@/api/storage'
// '/layout/isshow','/layout/isshow/search','/layout/meishi'
// const router = useRouter()

// watch(()=>new Date().getTime(),async()=>{
//     if(userStore.future - new Date().getTime() < 3000){
//         const a = await Renewal()
//         console.log(a)
//     }
// })


const whiteList = ['/login', '/', '/Layout','/Layout/isshow', '/Layout/isshow/search', '/Layout/meishi']

router.beforeEach(async(to,from,next)=>{
    
    const userStore = useuser()
    const isLoginCode =  await userStore.checkLoginFn()
    console.log(isLoginCode)
   
    userStore.nowtime = new Date().getTime()
    // console.log(userStore.nowtime)
    const future = getSession('__future__','')
    // console.log(future)
    
//    console.log(isLoginCode)
    // if(whiteList.includes(to.path)){
    //     next()
    // }else{
    //     if(isLoginCode === 1){
    //         next('/login')
    //     }
    // }
    // if(to.path === '/mine/address'){

    // }

    if (whiteList.includes(to.path)){
        
        
        // if(isLoginCode === 0 && to.path === '/login'){
        //     return next('/')
        // }
        return next()
    }else{
        
        const allRoute =  router.getRoutes()
        console.log(allRoute)
        const routeIndex = allRoute.findIndex((item)=> item.path === to.path)
        if(routeIndex >= 0 && isLoginCode.code === 1){
            if(userStore.future - userStore.nowtime < 0 && future){
                const a = await Renewal()
                console.log(a)
                console.log('3')
                next()
            }
            if(!future){
                next('/login')
            }
            
        }
        if (routeIndex >= 0 && isLoginCode.code === 0) {
            // if(userStore.future - userStore.nowtime < 300000){
            //     const a = await Renewal()
            //     console.log(a)
            //     console.log("1")
            //     next()
            // }else{
            //     console.log("2")
            //     next()
            // }
               next()
            
            
        }
        if(routeIndex < 0){
            next('/404')
        }
    }

    
})


// router.beforeEach(async (to,from,next)=>{
//     const userStore = useuser()
//     const isLoginCode =  await userStore.checkLoginFn()
//     console.log(isLoginCode)
//     if (whiteList.includes(to.path)) {
//         // 在白名单中 
//         // 已登录不能访问login路由  ==> 强制回到首页 
//         // if (!isLoginCode && to.path === '/login') {
//         //    next('/layout')
           
//         // }
        
//             next()
            
//     }else{
//         const allRoute =  router.getRoutes()
//         const routeIndex = allRoute.findIndex((item)=> item.path === to.path)
//         if(routeIndex >= 0 && isLoginCode === 1){
//              next('/login')
            
//         }
//         if(routeIndex >= 0 && isLoginCode === 0){
//              next()
//         }
//         if(routeIndex < 0){
//             next('/404')
//         }
//     }
// })




