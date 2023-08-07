import router from '@/router'
// import { useRouter } from 'vue-router'
import {useuser} from '@/store/user'
import {watch} from 'vue'
import {Renewal} from '@/api/login'
import {getLocal,setLocal} from '@/api/storage'
import { getSession,setSession,removeAllItem} from '@/api/storage'



const whiteList = ['/login', '/', '/Layout','/Layout/isshow', '/Layout/isshow/search', '/Layout/meishi']

router.beforeEach(async(to,from,next)=>{
    
    const userStore = useuser()
    const isLoginCode =  await userStore.checkLoginFn()
    console.log(isLoginCode)
   
    userStore.nowtime = new Date().getTime()
    
    const future = getSession('__future__','')
    

    if (whiteList.includes(to.path)){
        
        
       
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
           
               next()
            
            
        }
        if(routeIndex < 0){
            next('/404')
        }
    }

    
})


