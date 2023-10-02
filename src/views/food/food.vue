<template>
 
<div class="d1" ref="d1Ref" >
    <div class="top" :style="topbg">

        <div class="back" @click="back">
            <el-icon><ArrowLeft /></el-icon>
        </div>
    </div>
    
    <div class="middle">
        <span style="font-size: 7vw; font-weight: 500; padding: 3vw 7vw 3vw;">{{ Every.name }}</span>
        <img :src="Every.pic" alt="" style="width: 17vw; height: 17vw; background-repeat: repeat;">
        <div>
            <span>{{ Every.score }}</span>
            <span>配送约{{ Every.time }}</span>
        </div>
        <div>
        </div>
        <div class="content">
            <el-tabs v-model="activeName" class="demo-tabs" >
            <el-tab-pane label="点菜" name="first">
                <div class="box" ref="boxRef">
                <div class="left" style="position: fixed; background-color: white; height: 100%;">
                    <ul>
                        <li
                        v-for="(item,index2) in Every.list"
                        :key="item"
                        class="left-box"
                        style="padding: 4.2vw; color: #666666;  width: 10vw;"
                        :class="{change:changecolor === index2}"
                        >
                        {{ item }}
                        </li>
                    </ul>
                </div>
                    <div class="right">
                    <Scroll style="height: 100%; overflow: hidden;" @scroll="onScroll">
                        <ul ref="groupRef">
                        <li
                        v-for="(index,index1) in once"
                        :key="index1"
                        class="right-box"
                        
                        >
                            <div class="food-box">
                                <div>
                                    <img :src="index.foodimg" alt="" style="width: 25.3vw; height: 20vw; margin-right: 5vw;">
                                </div>
                                <div style="position: relative;">
                                    <span>{{ index.foodname }}</span>
                                    <p>{{ index.other }}</p>
                                    <p>月售{{ index.sales }}</p>
                                    <span>{{ index.price }}</span>
                                    <div class="d2" :class="[{onechange:numlist[`${index1}`] != 0},{anotherchange:!numlist[`${index1}`]}]">
                                        <div class="addred" >
                                        <div style="background-color:darkorange; width: 4vw; height: 4vw; margin-left: 30vw; display: inline-block;"
                                    @click="addFood(index,index1,Every)">
                                        <el-icon><Plus /></el-icon>
                                        
                                    </div>
                                    <span style="margin-left: 3vw;">{{ turnFood.singleShopNum[`${index1}`]  }}</span>
                                    <div style="background-color:darkorange; width: 4vw; height: 4vw; margin-left: 3vw; display: inline-block;"
                                    @click="reduceFood(index,index1,Every)">
                                        <!-- <el-icon><Plus /></el-icon> -->
                                        <el-icon><Minus /></el-icon>
                                    </div>
                                    </div>
                                    <div style="background-color: bisque; position: absolute; width: 10vw; height: 6vw;
                                    " class="choose"   @click="select(index,index1,Every)">选择</div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    </Scroll>  
                </div>
               </div>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second" class="config">
                    炒饭是常见的一种食物，是用煮好的米饭、一些菜肴、
                鸡蛋爆炒而成。炒饭分为多种品类，如扬州炒饭、香肠
                炒饭、西红柿炒饭、咖喱炒饭、培根炒饭等。在各地都
                有独特款式。
            </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <div class="float" @click="appear">
        <!-- @touchstart="confirm" -->
        
        <span v-if="turnFood.shopNum">{{ turnFood.shopNum }}</span>
        <div class="one" v-if="turnFood.shopTotal">￥{{ turnFood.shopTotal }}</div>
        <div class="two">预估加配送费￥4</div>
        <div class="settlement" @click.stop="settlement()">结算</div>
    </div>
    
</div>
<shoppingCart v-if="turnFood.Disappear" :list="cartList" :name="Every.name" @change="clearFn"></shoppingCart>
<router-view ></router-view>
</template>
<script setup>
import {ref,onMounted,computed,onBeforeMount,reactive,watch,nextTick,onUnmounted} from 'vue'
import useshopfood from '@/store/shopAndfood'
import {ArrowLeft,Plus,Minus} from '@element-plus/icons-vue'
import Scroll from "@/components/base/scroll";
import router from '@/router';
import shoppingCart from '@/components/shoppingCart/shoppingCart.vue'
import {useuser} from '@/store/user'
import { getSession,setSession,removeAllItem,removeItem, getLocal, setLocal} from '@/api/storage'

import {useCookies} from 'vue3-cookies'


const {cookies} = useCookies()
const once = ref([])

const groupRef = ref(null)
const d1Ref = ref(null)
const boxRef = ref(null)
const cartList = ref([])
const changecolor = ref(0)



let arr = reactive({
   
})
let numlist = {}
 
const Every = ref([])
const activeName = ref('first')

const scrollY = ref(0)
const arr2 = ref([])
const turnFood = useshopfood() 

cartList.value = turnFood.shoppingCart


const clearFn = (n) =>{
    numlist = n
}


const onScroll = (pos) => {
    //正数 
    scrollY.value = -pos.y
  };

watch(()=>once.value,async()=>{
    await nextTick()
    gain()
})


function gain(){
    const All = groupRef.value.children
   
    const unit = All[0].clientHeight * 4
    const newarr = []
    newarr[0] = 0
    const l = Every.value.list

    for(let i = 1;i < l.length;i ++){
        newarr[i] = newarr[i - 1] + unit
       
    }
    arr2.value = newarr
    
}

watch(scrollY,(newVal)=>{
    const New = arr2.value
    const L = Every.value.list
    const l = L.length
   
    for(let j = 0;j < L.length - 1;j ++){
        if(newVal >= New[j] && newVal < New[j + 1]){
            changecolor.value = j
            
        }
        if(j === 2 && newVal > New[j + 1]){
            changecolor.value = l - 1
        }
    }
})


const settlement = ()=>{
    const a = getSession('__top__',[])
    const b = getSession('__bottom__',[])
    
    for(let i = 0;i < b.length;i ++){
        numlist[`${i}`] = 0
    }
    cartList.value = []
    const name = a.name
    const user = getLocal('__user__','')
    let cart = turnFood.shoppingAll
    Reflect.deleteProperty(cart,`${name}`)
    cookies.set(`${user}`,JSON.stringify(cart),'2d')
    turnFood.shopTotal = 0
   turnFood.shopNum = 0

    let history = getLocal('__historyshop__',[])
    if(history.length === 0){
        let arr = []
        arr.push(a.name)
        setLocal('__historyshop__',arr)
    }else{
        
        let arr2 = getLocal('__historyshop__',[])
        console.log(arr2)
         arr2.push(a.name)
        setLocal('__historyshop__',arr2)
    }
   
        router.push({
            name:'finally'
        })
}



const back = ()=>{
    router.go(-3)
    removeItem('__top__')
    removeItem('__bottom__')
}

const appear = ()=>{
    if(cartList.value.length === 0){
        turnFood.Disappear = false
    }else{
        turnFood.Disappear = true
    }
   
   
}


const select = async(index,index1,Every)=>{

        arr[`${index1}`] = index1
        numlist[`${index1}`]++
        console.log(numlist)
       
        turnFood.singleShopNum[`${index1}`] = numlist[`${index1}`]
        console.log(turnFood.singleShopNum)
        index['num'] = turnFood.singleShopNum[`${index1}`]
       console.log(index)
      
        turnFood.shopTotal =  turnFood.shopTotal + Number(index.price)
    
        
        turnFood.shopNum = turnFood.shopNum + 1
        
        index['position'] = index1
      
        console.log(numlist)
        if(numlist[`${index1}`] === 1){
            cartList.value.push(index)
        }
  
       
        let cart = turnFood.shoppingAll
        console.log(turnFood.shoppingAll)
        const name = Every.name
       
        cart[`${name}`] = cartList.value
       
        console.log( cart[`${name}`])
        cart[`${name}`][0]['priceTotal'] = turnFood.shopTotal
        console.log(cart)
        cart[`${name}`][0]['NumTotal'] = turnFood.shopNum
        cart[`${name}`][0]['SingleShop'] = turnFood.singleShopNum
        
        
        
        const user = getLocal('__user__','')
        cookies.set(`${user}`,JSON.stringify(cart),'2d')
    }
    
   


const addFood = (index,index1,Every)=>{
    
        numlist[`${index1}`]++

        turnFood.singleShopNum[`${index1}`] = numlist[`${index1}`]
        index.num = turnFood.singleShopNum[`${index1}`]

        
        turnFood.shopTotal =  turnFood.shopTotal + Number(index.price)
       
        turnFood.shopNum = turnFood.shopNum + 1
       
        let cart = turnFood.shoppingAll
        const name = Every.name

        let arr = cartList.value
        arr[index1].num = index.num
       console.log(arr[index1])
      
        cart[`${name}`][0].priceTotal = turnFood.shopTotal
        cart[`${name}`][0].NumTotal = turnFood.shopNum
        cart[`${name}`][0].SingleShop = turnFood.singleShopNum
        const user = getLocal('__user__','')
        cookies.set(`${user}`,JSON.stringify(cart),'2d')
}

const reduceFood = (index,index1,Every)=>{
   
    numlist[`${index1}`]--

    turnFood.singleShopNum[`${index1}`] = numlist[`${index1}`]
    index['num'] = turnFood.singleShopNum[`${index1}`]
 
    turnFood.shopNum = turnFood.shopNum - 1
   
    turnFood.shopTotal =   turnFood.shopTotal - Number(index.price)
    
    let arr = cartList.value
   
    if(!numlist[`${index1}`]){
        for(let i = 0;i < arr.length;i ++){
        if(arr[i].position === index1){
            arr.splice(i,1)
           
        }
        
    }
   
    }
       if(cartList.value.length != 0){
        let cart = turnFood.shoppingAll
        const name = Every.name
       
        cart[`${name}`][0].priceTotal = turnFood.shopTotal
        console.log( cart[`${name}`][0].priceTotal)
        cart[`${name}`][0].NumTotal = turnFood.shopNum
      
        cart[`${name}`][0].SingleShop = turnFood.singleShopNum
        const user = getLocal('__user__','')
        cookies.set(`${user}`,JSON.stringify(cart),'2d')
       }
       if(cartList.value.length === 0){
        const name = Every.name
        let cart = turnFood.shoppingAll
       
        Reflect.deleteProperty(cart,`${name}`)
        const user = getLocal('__user__','')
        console.log('abc')
        cookies.set(`${user}`,JSON.stringify(cart),'2d')
       }
}

const topbg = computed(()=>{
    let blur = 1.3
    return {
        backgroundImage:`url(${Every.value.pic})`,
        filter:`blur(${blur}px)`
    }
})

function set(p) {
    // console.log(once)
   
    for(let i = 0;i < p.length;i ++){
        arr[`${i}`] = -1
        numlist[`${i}`] = 0
    }
}

// onMounted(()=>{

  
// })
onBeforeMount(()=>{
   
    const top = getSession('__top__',[])
    const bottom = getSession('__bottom__',[])
    
    if(top.length === 0 && bottom.length === 0){
        Every.value = turnFood.showFood
        once.value = Every.value.foodList.foodList
        setSession('__top__',Every.value)
        setSession('__bottom__',once.value)
    }else{
        Every.value = top
        once.value = bottom
    }
    const user = getLocal('__user__','')
    const m = cookies.get(`${user}`)
    if(m){


        const a = Every.value.name
        if(!Object.hasOwn(m,a)){
            for(let i = 0;i < once.value.length;i ++){
                arr[`${i}`] = -1
                numlist[`${i}`] = 0
            }
            turnFood.singleShopNum = turnFood.oldSingleShop(a)
            numlist =  turnFood.singleShopNum
           
        }else{
          
            turnFood.singleShopNum = turnFood.oldSingleShop(a)
            for(let i = 0;i < once.value.length;i ++){
                arr[`${i}`] = -1
                numlist[`${i}`] = 0
                if(turnFood.singleShopNum[`${i}`]){
                    numlist[`${i}`] = turnFood.singleShopNum[`${i}`]
                }
            }
        
           
            

        }
    }else{
        const p = once.value
        set(p)
        
    }
  
})
onUnmounted(()=>{
    console.log('123')
})

</script>
 


<style lang='scss' scoped>
 .d1{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background-color:#f5f5f5;
    .top{
        width: 100%;
        height: 15vw;
        // position: relative;
        
    }
    .back{
        position: absolute;
        top: 3vw;
        left: 3vw;
    }
    .middle{
        background-color: white;
        border-radius: 5vw;
        // position: absolute;
        // top: 15.4vw;
        width: 100%;
        // right: 0;
        .content{
            .demo-tabs{  
               
                .el-tabs__content{
                    .config{
                        padding: 10px 5px 15px 5px;
                        text-indent: 32px;
                    }
                    #pane-first{
                    .box{
                        // display: flex;
                        // overflow: scroll;
                        .left{
                            
                            .left-box{
                                &.change{
                                
                                background-color:#f5f5f5;
                            
                        }
                            }
                        }
                        .right{
                            // height: 540px;
                            position: fixed;
                            top: 230px;
                            bottom: 0;
                            overflow: scroll;
                            margin-left: 20vw;
                            // overflow: scroll;
                            .right-box{
                            margin-top: 10vw;
                            width: 80vw;
                            // background-color: #666666;
                            .food-box{
                                display: flex;
                                .d2{
                                    .addred{
                                        display: none;  //
                                    }
                                    .choose{
                                        display: block;
                                        bottom: 0;
                                    }
                                    &.onechange{
                                        .addred{
                                            display: block;
                                        }
                                        .choose{
                                            display: none;
                                        }
                                    }
                                    &.anotherchange{
                                        .addred{
                                            display: none;
                                        }
                                        .choose{
                                            display: block;
                                        }
                                    }
                                }
                            }
                        }
                        }
                    }
                }
                }
                :deep(.el-tabs__active-bar){
                    background-color:orange;
                }
                :deep(.el-tabs__item.is-active){
                    color: black;
                    font-weight: 900;
                }
                :deep(.el-tabs__nav-wrap){
                    padding-left: 5vw;
                }
            }
        }
    }
    .float{
        position: absolute;
        left: 35vw;
        background-color: #222525;
        color: white;
        bottom: 15vw;
        border-radius: 10vw;
        width: 70vw;
        height: 17vw;
        left: 18vw;
        .one{
            padding-left: 8vw;
            font-size: 5vw;
        }
        .two{
            padding-left: 5vw;
            padding-top: 1vw;
            display: inline-block;
        }
        span{
            margin-left: 3vw;
            background-color: red;
            padding: 0.3vw 1vw;
            border-radius: 50%;
            position: absolute;
            top: 1vw;
        }
        .settlement{
            background-color: red;
            display: inline-block;
            width: 15vw;
            margin-left: 15vw;
            height: 7vw;
            border-radius: 10vw;
            text-align: center;

        }
    }
 }
     // const confirm = ()=>{
    //     const All = groupRef.value.children
    //     const height = All[0].clientHeight
    //     console.log(height)
    //     for(let i = 0;i < All.length;i ++){
    //         if((height * (i + 1) + 230) > e.touches[0].pageY){
    //             currentIndex.value = i
    //            break
    //         }
    //     }
    //     console.log(e.touches[0].pageY,currentIndex.value)
       
    // }






// const isbuy = computed(()=>{
//     return number.value
// })
// const isselect = computed(()=>{
//     return !number.value
// })
</style>

