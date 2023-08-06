import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import { getshopFn } from "@/api/shop";
BScroll.use(Pullup)

export function usePullup(){

    const rootRef = ref(null)
    const pullup = ref(null)
    const isPullUpLoad = ref(false)
    const newdata = ref([])
    const shopList = ref([])
    onMounted(()=>{
        pullup.value = new BScroll(rootRef.value,{
            pullUpLoad: true,

        })
        pullup.value.on('pullingUp',async ()=>{
            await updateshopFn()
            isPullUpLoad.value = true
            pullup.value.finishPullUp()
            pullup.value.refresh()
            isPullUpLoad.value = false
        })

        async function updateshopFn(){
            const {data} = await getshopFn()
            newdata.value = data.data
            shopList.value += newdata.value
        }
    })


    return {
        rootRef,
        isPullUpLoad,
        shopList
    }


}