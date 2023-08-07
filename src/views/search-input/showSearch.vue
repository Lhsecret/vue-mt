<template>
 
<div class="big-box">
    <div class="d1">
        <el-icon @click="goback"><ArrowLeftBold /></el-icon>
        <span>搜索页</span>
    </div>
    <div class="d2">
        <el-input
        placeholder="请输入商家或商品名称"
        v-model="queryParams.scraf"
        
        ></el-input>
        <span @touchend="turn">搜索</span>
    </div>
    <div class="d3">
       
        <div class="small-two">
            <p>历史搜索</p>
            
            <el-icon style="margin-left: 70vw;" @click="deleteFn"><Delete /></el-icon>
            <div class="historyList">
                <div
                class="turnBox"
                v-for="item in History"
                @click="turnagain(item)"
                >{{ item }}</div>
            </div>
        </div>
    </div>
    
</div>
<router-view ></router-view>
</template>
 
<script setup>
import { Delete,ArrowLeftBold } from "@element-plus/icons-vue";
import {ref,computed,onMounted,watch} from 'vue'
import {getsearchshop} from '@/api/shop'
import { useRouter,useRoute } from "vue-router";
import {getLocal,setLocal} from '@/api/storage'
import useisPullUpLoad from '@/store/isPullUpLoad'
import {removeLocalItem} from '@/api/storage'

const History = ref([])
const turnshowShop = useisPullUpLoad()
const router = useRouter()
const route = useRoute()
const historyList = ref([])
const queryParams = ref({
    scraf:''
})




const turn = async()=>{
    const {data} = await getsearchshop(queryParams.value)
    console.log(data)
    const text = 'text'
    const middle = data.data
    console.log(middle)
    Reflect.set(middle[0],text,queryParams.value)
    turnshowShop.showShop = middle
    const arr =  getLocal("__historyList__",[])
   

    if(arr.length === 0){
        arr.push(middle)
        setLocal("__historyList__",arr)
    }else{
            let index = 0
            for(const item of arr){
                const a = Reflect.get(item[0],text)
                if(a.scraf === queryParams.value.scraf){
                    index++
                   
                }
               
            }
            if(index === 0){
                arr.push(middle)
                setLocal("__historyList__",arr)
            }
           
    
    }
     router.push({
        name:'search',
        
    })
}
const goback = ()=>{
    router.go(-1)
}

const deleteFn = ()=>{
    removeLocalItem('__historyList__')
    historyList.value = []
}


const turnagain = (item)=>{
    const text = 'text'
    const arr = getLocal("__historyList__",[])
    for(const i of arr){
        const a = Reflect.get(i[0],text)
      
        if(a.scraf === item){
            turnshowShop.showShop = i
           
        }
    }

    router.push({
        name:'search',
        
    })
}

onMounted(()=>{
    historyList.value = getLocal("__historyList__",[])
    const history = historyList.value
    const text = 'text'
    const arr = []
    for(const i of history){
        const a = Reflect.get(i[0],text)
        arr.push(a.scraf)
        
    }
    History.value = arr
})

watch(route,()=>{
    historyList.value = getLocal("__historyList__",[])
    const history = historyList.value
    const text = 'text'
    const arr = []
    for(const i of history){
        const a = Reflect.get(i[0],text)
        arr.push(a.scraf)
        
    }
    History.value = arr
})

</script>
 
<style lang='scss' scoped>
 .big-box{
    z-index: 20;
    position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
    background-color:#f5f5f5;
    .d1{
        padding: 3vw;
        margin-bottom: 4vw;
        background-color: white;
        .el-icon{
            margin-right: 3vw;
        }
    }
    .d2{
        padding: 2vw;
        position: relative;
        .el-input{
            height: 10vw;
            width: 95vw;
            :deep(.el-input__wrapper){
                border-radius: 5vw;
                
            }
        }
        span{
            position: absolute;
            right: 10vw;
            top: 4vw;
        }
    }
    .d3{
        background-color: white;
        width: 100%;
        height: 100%;
        border-radius: 5vw;
        margin-top: 2vw;
        .small-two{
            padding: 3vw;
            p{
                display: inline-block;
            }
            .historyList{
                display: flex;
                margin-top: 3vw;
                p{
                    font-weight: 800;
                    
                }
                .turnBox{
                    display: inline-block;
                    border-radius: 4vw;
                    background-color: antiquewhite;
                    padding: 1vw 3vw;
                    max-width: 20vw;
                    height: 6vw;
                    text-align: center;
                    margin: 0.2vw 2vw;
                }
            }
        }
    }

 }
</style>