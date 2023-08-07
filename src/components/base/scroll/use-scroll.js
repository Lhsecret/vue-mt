import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, ref, onUnmounted, onActivated, onDeactivated } from 'vue'

import useisPullUpLoad from '@/store/isPullUpLoad'
import Pullup from '@better-scroll/pull-up'
import { getshopFn } from "@/api/shop";
import {removeAllItem} from '@/api/storage'

import useshopfood from '@/store/shopAndfood'


BScroll.use(ObserveDOM)
BScroll.use(Pullup)
export function useScroll(props,emit) {
  // props 自己可以扩展的修改的 属性 比如probeType
  const rootRef = ref(null)
  const scroll = ref(null)
  let newdata = ref([])
  let data2 = ref([])
  // const isPullUpLoad = ref(true)
  const isPullUpLoadStore = useisPullUpLoad()
  const turnFood = useshopfood()

  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true,//开启深度监听dom的插件 
      probeType : props.probeType,
      click: props.click,
      disableTouch: false,
      
      pullUpLoad: true,
    })

    //获取滚顶距离
    if (props.probeType > 0) {
      //外层的是 betterscroll对象 自带的 
      scroll.value.on('scroll', (pos) => {
        //触发 父组件内的  scroll自定义事件 
        emit('scroll', pos)
      })
    }

    //pullup的函数
    scroll.value.on('pullingUp', async()=>{

      if(props.tip === 2){
        turnFood.showshopLoading = true
        const middleware = await updateFn()
        console.log(middleware.length)
        if(middleware.length === 0){
          scroll.value.closePullUp()
          turnFood.showshopLoading = false
          
            turnFood.showshopEnd = true
          
            removeAllItem()
         
        }else{
         
          setTimeout(()=>{
            scroll.value.finishPullUp()
          scroll.value.refresh()
          turnFood.showshopLoading = false
          },1000)
       
        }
      }

      if(props.tip === 1){

        isPullUpLoadStore.isPullUpLoad = true
        const middleware = await updateshopFn()
        console.log(middleware.length)
        setTimeout(()=>{},1000)
        if(middleware.length === 0){
          scroll.value.closePullUp()
          isPullUpLoadStore.isPullUpLoad = false
          isPullUpLoadStore.isEnd = true
          removeAllItem()
        }else{
          scroll.value.finishPullUp()
          scroll.value.refresh()
          isPullUpLoadStore.isPullUpLoad = false
        }


      }

      if(props.tip === 3){
        return
      }
      

     
     
  })

  async function updateshopFn(){
      const {data} = await getshopFn()
      newdata.value = data.data
    
      emit('shoplist',newdata.value)
      return newdata.value
  }
  
  async function updateFn(){
    
  
      if(turnFood.copyshop.length >=4){
        data2.value = turnFood.copyshop.splice(0,4)
      }else{
        const a = turnFood.copyshop.length
        data2.value = turnFood.copyshop.splice(0,a)
        
      }
  
      
    
    setTimeout(()=>{
      emit('shopList',data2.value)
    },500)
    return data2.value

  }

  })


  onUnmounted(() => {
    // 销毁 
    scroll.value.destroy()
  })

  onActivated(() => {
    // 恢复功能 
    scroll.value.enable()
    // 刷新 
    scroll.value.refresh()
  })

  onDeactivated(() => {
    // 失去功能 
    scroll.value.disable()
  })




  return {
    rootRef,
    scroll,
    
  }
}


