<template>
 
<div class="d1" ref="d1Ref">
    <div class="top" :style="topbg">

        
    </div>
    <div class="back" @click="back">
            <el-icon><ArrowLeft /></el-icon>
        </div>
    <div class="middle">
        <span style="font-size: 7vw; font-weight: 500; padding: 3vw 7vw 3vw;">{{ Every.name }}</span>
        <img :src="Every.pic" alt="" style="width: 17vw; height: 17vw; background-repeat: repeat;">
        <div>
            <span>{{ Every.score }}</span>
            <span>配送约{{ Every.time }}</span>
        </div>
        <div>
            <!-- 亲爱的顾客{{ arr.haa }} -->
        </div>
        <div class="content">
            <el-tabs v-model="activeName" class="demo-tabs" >
            <el-tab-pane label="点菜" name="first">
                
              <!-- <Scroll> -->
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
                <!-- <Scroll> -->
                    <div class="right">
                    <Scroll style="height: 100%; overflow: hidden;" @scroll="onScroll" >
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
                <!-- arr[`${index1}`] === index1 -->
                <!-- numlist[`${index1}`] === 0 -->
               </div>
              <!-- </Scroll> -->
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">Config</el-tab-pane>
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
import { getSession,setSession,removeAllItem,removeItem, getLocal} from '@/api/storage'
// import VueCookies from 'vue-cookies';
import {useCookies} from 'vue3-cookies'

const userStore = useuser()
const {cookies} = useCookies()
const once = ref([])
const isappear = ref(false)
const groupRef = ref(null)
const d1Ref = ref(null)
const boxRef = ref(null)
const cartList = ref([])
const changecolor = ref(0)



let arr = reactive({
   
})
let numlist = {}
    // '0':0,
    // '1':0,
    // '2':0,
    // '3':0,
    // '4':0,
    // '5':0,
    // '6':0,
    // '7':0,
    // '8':0,
    // '9':0,
    // '10':0



const Every = ref([])
const activeName = ref('first')

const scrollY = ref(0)
const arr2 = ref([])
const turnFood = useshopfood() 
// let number = turnFood.oldshopNum(Every.name)
// let price = turnFood.oldshopTotal(Every.name)
cartList.value = turnFood.shoppingCart

// console.log(turnFood.oldshoppingCart)
// numlist.value = turnFood.singleShopNum
// console.log(turnFood.singleShopNum)
// console.log(numlist)
// const differ = ref(1)
// const numlist = turnFood.numList
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
    // const unit = All.slice(0,4)
    const unit = All[0].clientHeight * 4
    const newarr = []
    newarr[0] = 0
    const l = Every.value.list

    for(let i = 1;i < l.length;i ++){
        newarr[i] = newarr[i - 1] + unit
        // console.log(newarr[i])
    }
    arr2.value = newarr
    // console.log(All[0].clientHeight)
}

watch(scrollY,(newVal)=>{
    const New = arr2.value
    const L = Every.value.list
    const l = L.length
    // console.log(New)
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
   turnFood.historyshop = a
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
        // console.log(numlist[`${index1}`])
        // console.log(numlist)
        turnFood.singleShopNum[`${index1}`] = numlist[`${index1}`]
        console.log(turnFood.singleShopNum)
        index['num'] = turnFood.singleShopNum[`${index1}`]
       console.log(index)
        // console.log(turnFood.singleShopNum[`${index1}`])
        // const p = arr[`${index1}`]
        // console.log(arr[`${index1}`])
        // currentIndex.value = index.ranking

        // number.value = turnFood.oldshopNum(Every.name)
        // price.value = turnFood.oldshopTotal(Every.name)
        // console.log(number.value)
        turnFood.shopTotal =  turnFood.shopTotal + Number(index.price)
    
        // turnFood.shopTotal = price
        turnFood.shopNum = turnFood.shopNum + 1
        // console.log(turnFood.shopNum)
        // turnFood.shopNum = number
        index['position'] = index1
        // console.log(index)
        // console.log(index)
        console.log(numlist)
        if(numlist[`${index1}`] === 1){
            cartList.value.push(index)
        }
  
        // await nextTick()
        let cart = turnFood.shoppingAll
        console.log(turnFood.shoppingAll)
        const name = Every.name
        // console.log(cart)
        // console.log(turnFood.shoppingAll)
       
       
        cart[`${name}`] = cartList.value
        // console.log(cartList.value)
        console.log( cart[`${name}`])
        cart[`${name}`][0]['priceTotal'] = turnFood.shopTotal
        console.log(cart)
        cart[`${name}`][0]['NumTotal'] = turnFood.shopNum
        cart[`${name}`][0]['SingleShop'] = turnFood.singleShopNum
        
        
        
        const user = getLocal('__user__','')
        cookies.set(`${user}`,JSON.stringify(cart),'2d')
        // console.log(cookies.get(`${user}`))

        // turnFood.shoppingCart = cartList.value
        // console.log(turnFood.shoppingCart)
        // arr['haa'] = "1"
        // console.log(arr.name,arr)
    }
    
   


const addFood = (index,index1,Every)=>{
    
        numlist[`${index1}`]++

        turnFood.singleShopNum[`${index1}`] = numlist[`${index1}`]
        index.num = turnFood.singleShopNum[`${index1}`]

        // console.log(turnFood.singleShopNum[`${index1}`])
        turnFood.shopTotal =  turnFood.shopTotal + Number(index.price)
        // turnFood.shopTotal = price.value
        turnFood.shopNum = turnFood.shopNum + 1
        // turnFood.shopNum = number.value
        let cart = turnFood.shoppingAll
        const name = Every.name

        let arr = cartList.value
        arr[index1].num = index.num
       console.log(arr[index1])
      
        // console.log(turnFood.shoppingAll)
        
        // cart[`${name}`] = cartList.value

        cart[`${name}`][0].priceTotal = turnFood.shopTotal
        cart[`${name}`][0].NumTotal = turnFood.shopNum
        cart[`${name}`][0].SingleShop = turnFood.singleShopNum
        const user = getLocal('__user__','')
        cookies.set(`${user}`,JSON.stringify(cart),'2d')

        // const cart = cartList.value
        // cart[0]['priceTotal'] = turnFood.shopTotal
        // cart[0]['NumTotal'] = turnFood.shopNum
        // const user = getLocal('__user__','')
        // cookies.set(`${user}`,JSON.stringify(cartList.value),'2d')
        
        // if(numlist[`${index1}`] === 1){
        //     cartList.value.push(index)
        // }
        
        // turnFood.historyshop.push(index)
       
        // console.log(number.value,price.value)

}

const reduceFood = (index,index1,Every)=>{
   
    numlist[`${index1}`]--

    turnFood.singleShopNum[`${index1}`] = numlist[`${index1}`]
    index['num'] = turnFood.singleShopNum[`${index1}`]

    // differ.value = numlist[`${index1}`]
    turnFood.shopNum = turnFood.shopNum - 1
    // turnFood.shopNum = number.value
    turnFood.shopTotal =   turnFood.shopTotal - Number(index.price)
    // turnFood.shopTotal = price.value
    let arr = cartList.value
    // console.log(arr)
    if(!numlist[`${index1}`]){
        for(let i = 0;i < arr.length;i ++){
        if(arr[i].position === index1){
            arr.splice(i,1)
           
        }
        
    }
    // console.log(index1)
    }
       if(cartList.value.length != 0){
        let cart = turnFood.shoppingAll
        const name = Every.name
        // console.log(cart)
        // console.log(turnFood.shoppingAll)
        // console.log(name)
        // cart[`${name}`] = cartList.value
        cart[`${name}`][0].priceTotal = turnFood.shopTotal
        console.log( cart[`${name}`][0].priceTotal)
        cart[`${name}`][0].NumTotal = turnFood.shopNum
        // cart[`${name}`][0]['All'] = arr
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
        
    //    let Cart = turnFood.shoppingAll

        
        
    // const cart = cartList.value
    // cart[0]['priceTotal'] = turnFood.shopTotal
    // cart[0]['NumTotal'] = turnFood.shopNum
    // const user = getLocal('__user__','')
    // cookies.set(`${user}`,JSON.stringify(cartList.value),'2d')
    
   
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
    // console.log(arr)
}

onMounted(()=>{

    // const p = once.value
    // set(p)
    // const a = Every.value.name
    // arr = turnFood.oldAll(a)
    // console.log(turnFood.foodnumber,turnFood.foodprice)
    // console.log(number.value,price.value)
})
onBeforeMount(()=>{
    // const user = getLocal('__user__','')
    // const middle = JSON.parse(cookies.get(`${user}`))
   
    // console.log(middle)
    // cartList.value = turnFood.oldshoppingCart
    // turnFood.shopNum = turnFood.oldshopNum
    // turnFood.shopTotal = turnFood.oldshopTotal
    // console.log( turnFood.oldshopTotal)
    // console.log( cartList.value)
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

        // const a = Every.value.name
        // console.log(a)
        // turnFood.singleShopNum = turnFood.oldSingleShop(a)
        // console.log(turnFood.oldSingleShop(a))
        // console.log(turnFood.singleShopNum)
        // numlist =  turnFood.singleShopNum
        // console.log(numlist)
        // if(!Object.hasOwn(m,a)){
        //     for(let i = 0;i < once.value.length;i ++){
        //         arr[`${i}`] = -1
        //         numlist[`${i}`] = 0
        //     }
        // }
        
        // console.log(numlist)

        const a = Every.value.name
        if(!Object.hasOwn(m,a)){
            for(let i = 0;i < once.value.length;i ++){
                arr[`${i}`] = -1
                numlist[`${i}`] = 0
            }
            turnFood.singleShopNum = turnFood.oldSingleShop(a)
            numlist =  turnFood.singleShopNum
            console.log(numlist)
        }else{
            // for(let i = 0;i < once.value.length;i ++){
            //     arr[`${i}`] = -1
            //     numlist[`${i}`] = 0
            // }
            turnFood.singleShopNum = turnFood.oldSingleShop(a)
            for(let i = 0;i < once.value.length;i ++){
                arr[`${i}`] = -1
                numlist[`${i}`] = 0
                if(turnFood.singleShopNum[`${i}`]){
                    numlist[`${i}`] = turnFood.singleShopNum[`${i}`]
                }
            }
        
           
            // numlist =  turnFood.singleShopNum
            console.log(numlist)

        }
    }else{
        const p = once.value
        set(p)
        
    }
    // console.log(turnFood.showFood)
    // console.log(Every.value.foodList.foodList)
    // console.log(d1Height.value,boxHeight.value)
})
onUnmounted(()=>{
    console.log('123')
})
// watch(()=>router.currentRoute.value.name,()=>{
//     if(router.currentRoute.value.name === 'food'){

//     }
// })
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

