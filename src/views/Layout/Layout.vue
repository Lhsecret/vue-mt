<template>
 
<div class="No-one1">
   
    <div class="search2" :style="divtopStyle">
            
            <el-input
           
            :prefix-icon="Search"
            placeholder="请输入商家或商品名称"
            style="width: 90.67vw; height: 10.67vw;"
            @focus="isshow"
           
            ></el-input>
            <div class="button">搜索</div>
        </div>
    <div class="bottom">
       <div class="d1"><el-icon><HomeFilled /></el-icon></div>
       <div class="d1" @click="turnOrder"><el-icon><Ticket /></el-icon></div>
       <div class="d1" @click="turnMine"><el-icon><UserFilled /></el-icon></div>
    </div>  
    
   <div class="No-one">
    <Scroll class="layout-content" @scroll="onScroll1" :probeType="3" @shoplist="shopFn1" ref="shopRef" :tip="1">
        <div>
            <div class="top">
        <div class="direction" ref="directionRef" >
            <el-icon><Location /></el-icon>
            <span style="padding-left: 1.33vw;padding-right: 1.33vw;">登封</span>
            <el-icon><ArrowRight /></el-icon>
        </div>
        <div class="search">
            <!-- <SvgIcon icon="search"></SvgIcon> -->
            <el-input
            :prefix-icon="Search"
            
            @focus="isshow"
            placeholder="请输入商家或商品名称"
            style="width: 90.67vw; height: 10.67vw;"
            ></el-input>
            <div class="button">搜索</div>
        </div>
       
    </div>
    <div class="category">
        <div class="together">
           

                <div
               v-for="item in categoryImg"
               :key="item"
               class="cate-food"
              @click="turn(item)"
               >
                <img :src="item.imgUrl" alt="">
                <div>{{ item.text }}</div>
            </div>
           
           
        </div>
    </div>
    <div class="slider-content">
        <Slider :sliders="slider"></Slider>
    </div>
    <div class="middle">
        <div class="shop">附近商铺</div>
    </div>
    <div class="middle-shop" >
        <!-- v-loading="!shopList.length&&!categoryImg.length" -->
        <div class="big-box">
            <div
            v-for="item in shopList"
            :key="item._id"
            class="d2"
            style="display: flex; margin-bottom: 7.6vw;"
            @click="turnmeishi(item)"
            >
            <img :src="item.pic" alt="" style="width:27.8vw; height: 27.8vw;">
            <div style="padding-left: 2.5vw;">
                <div style="font-size: 5vw;">{{ item.name }}</div>
                <div style="margin-top: 3vw; position: relative;">
                    <span style="color: brown; font-size: 3.5vw; margin-right: 2vw;">{{ item.score }}</span>
                    <span style="color: darkgray; font-size: 3.5vw;">{{ item.sales }}</span>
                    <span style="color: chocolate; font-size: 2.8vw; margin-left: 32vw;">{{ item.message }}</span>
                </div>
                <div style="margin-top: 3vw;">
                    <span style="font-size: 2.5vw; color: darkgray; margin-right: 3vw;">{{ item.price }}</span>
                    <span style="font-size: 3vw; color: darkgray;">{{ item.time }}</span>
                    <span style="font-size: 3vw; color: darkgray; margin-left: 2vw;">{{ item.distance }}</span>
                </div>
            </div>
        </div>
       
        </div>
        <div class="bottom-tips" v-if="isPullUpLoadStore.isEnd">
            已经到底了
        </div>
        <div class="bottom-loading" v-if="isPullUpLoadStore.isPullUpLoad">
            <img width="24" height="24" src="../../components/base/loading/loading.gif" />
            <span>正在加载中</span>
        </div>
        
    </div>
    <div style="background-color: #f5f5f5; width: 100%; height: 15vw;"></div>
        </div>
    </Scroll>
   </div>
   <router-view>
      
    </router-view>
    
</div>
  
</template>
 
<script setup>
import { Location } from "@element-plus/icons-vue";
import { ArrowRight,UserFilled,HomeFilled,Ticket } from "@element-plus/icons-vue";
import {  Search } from '@element-plus/icons-vue'
import {ref,onBeforeMount,computed,onMounted,watch} from 'vue'
import {getFdcategory,getLunbo} from "@/api/Fdcategory"
import Slider from '@/components/base/slider'
import { getshopFn } from "@/api/shop";
import Scroll from "@/components/base/scroll";
import useFixed from './layscroll'
import { useRouter } from "vue-router";
import useisPullUpLoad from '@/store/isPullUpLoad'
import { getSession,setSession} from '@/api/storage'
import useshopfood from '@/store/shopAndfood'
import {useuser} from '@/store/user'
// const isappear = ref(true)
const turnFood = useshopfood()
const userStore = useuser()
// const loading = ref(true)
const queryParams = ref('')
const router = useRouter();
const shopList = ref([])
const categoryImg = ref([])
const slider = ref([])
const isPullUpLoadStore = useisPullUpLoad()


const {onScroll1,directionRef,divtopStyle} = useFixed()

const isshow = ()=>{
   
    router.push({
        name:'isshow'
    })
    
}

watch(()=>router.currentRoute.value.name,()=>{
    if(router.currentRoute.value.name === 'isshow'){
        location.reload();
    }
  
  
})

const categoryFn = async()=>{

    const {data} = await getFdcategory()
    categoryImg.value = data.data
    
}

const turnmeishi = (item)=>{
    router.push({
        name:'meishi'
    })
}


const lunboFn = async()=>{
    const {data} = await getLunbo()
    slider.value = data.data
    
}

const shopFn = async()=>{
    let arr = getSession("__shopList__",[])
    if(arr.length){
        shopList.value = arr
    }else{
        const {data} = await getshopFn()
        shopList.value = data.data
        setSession("__shopList__",data.data)
    }
}


function turn(item){
    router.push({
        path:'/layout/123456',
        query:{
            id:item._id
        }
    })
}

const shopFn1 = (arr)=>{
   for( let item of arr){
    shopList.value.push(item)
   }
   setSession("__shopList__",shopList.value)
}

const turnMine = ()=>{
    
    router.push({
        name:'mine'
    })
}

const turnOrder = ()=>{
    router.push({
        name:'order'
    })
}
onMounted(()=>{
    const allRoute =  router.getRoutes()
})

onBeforeMount(()=>{
    categoryFn()
    lunboFn()
    shopFn()
    
})

</script>
 
<style lang='scss' scoped>
.No-one1{
    @include clearfix;
    position: relative;
    width: 100%;
    height: 100%;
    .search2{
        //   bottom: 0;
          display: none;
          padding-left: 2.67vw;
           position: relative;
          align-items: center;
          background-color: $topbg;
          .el-input{
           width: 104vw;
           height: 10.7vw;
           margin-top: 1.33vw;
           margin-bottom: 1.33vw;
           :deep(.el-input__wrapper){
               border-radius: 26.67vw;
               font-size: 3vw;
           }
          }

           .button{
           position: absolute;
           right: 8.53vw;
           padding: 1.33vw 4vw;
           background-color: #ffcd4b;
           border-radius: 26.67vw;
           font-size: 3vw;
           top: 3vw;
           }
       }
    .bottom{
        width: 100%;
        display: flex;
        position: absolute;
        bottom: 0;
        z-index: 10;
        background-color: #fafafa;
        .d1{
            display: flex;
            flex-basis: 33.3%;
            align-items: center;
            justify-content: center;
            height: 13vw;
            .el-icon{
                // background-color: #828282;
                font-size: 5vw;
            }
        }
    }
    .No-one{
    // @include clearfix;
    width: 100%;  
  
    position: relative;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: scroll;
    .layout-content{
        height: 100%;
        overflow: hidden;
        .top{
        display: flex;
        flex-direction: column;
        position: relative;
        height: 24.5vw;
        width: 100%;
        background-color: $topbg;
        .direction{
            height: 8vw;
            display: flex;
            align-items: center;
            padding-left: 2.67vw;
            padding-top: 1.6vw;
            font-size: 3vw;
        }
        .search{
          
           display: flex;
           padding-left: 2.67vw;
            position: relative;
           align-items: center;
           .el-input{
            width: 104vw;
            height: 10.7vw;
            margin-top: 1.33vw;
            margin-bottom: 1.33vw;
            :deep(.el-input__wrapper){
                border-radius: 26.67vw;
                font-size: 3vw;
            }
           }

            .button{
            position: absolute;
            right: 8.53vw;
            padding: 1.33vw 4vw;
            background-color: #ffcd4b;
            border-radius: 26.67vw;
            font-size: 3vw;
            }
        }

    }
    .together{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 2.67vw 2.67vw;
        .cate-food{
            flex-basis: 20%;
            text-align: center;
            img{
            width: 12.53vw;
            height: 12.53vw;
           
        }
       div{
        font-size: 3.47vw;
       }
        }
    }
    .slider-content{
        
        width: 100%;
       
    }
   .middle{
    background-color: #f5f5f6;
    .shop{
        width: 100%;
        padding: 2vw 4vw 2vw;
        
    }
  
   }
   .middle-shop{
    .bottom-loading{
        display: flex;
        height: 8vw;
        justify-content: center;
        align-items: center;
    }
    .bottom-tips{
        text-align: center;
    }
   }
    }
    
}
}
</style>