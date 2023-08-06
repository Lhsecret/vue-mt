<template>
 
<div class="d3" @click="disappear">
    <div class="cart" @click.stop>
       
        <div class="top">
            <div class="top-content" style="margin-left: 5vw;">
                购物车
            </div>
        </div>
        
        <div class="box">
            <div class="title">
                <div class="title-content" style="line-height: 10vw; margin-left: 70vw;">
                    <el-icon style="color: darkgray;"><DeleteFilled /></el-icon>
                    <span @click="clear">清空购物车</span>
                </div>
            </div>
            <div class="list">
               <Scroll style="height: 100%; overflow: hidden;">
                <ul>
                    <li
                    v-for="(item,index) in list"
                    :key="index"
                    style="display: flex; margin-left: 5vw; margin-bottom: 5vw; position: relative;"
                    >
                    <img :src="item.foodimg" alt="" style="width: 16vw; height: 16vw;">
                    <div style="margin-left: 5vw; display: inline-block;">
                        <p>{{ item.foodname }}</p>
                        <span style="font-size: 5vw; color: red;">￥{{ item.price }}</span>
                    </div>
                    <span style="position: absolute; right: 24vw; top: 6vw;">{{ item.num }}份</span>
                    <span>{{ index }}</span>
                    </li>
                </ul>
               </Scroll>
            </div>
            <div class="bottom">
                <div>商品价格{{turnFood.shopTotal}}</div>
                <span>打包费</span>
                <span>￥3</span>
                <span>总计{{turnFood.shopTotal + 3}}</span>
            </div>
        </div>
    </div>
</div>
  
</template>
 
<script setup>
import {DeleteFilled} from '@element-plus/icons-vue'
import {ref,onMounted,onBeforeMount,watch,onUnmounted} from 'vue'
import useshopfood from '@/store/shopAndfood'
import Scroll from "@/components/base/scroll";
import {useCookies} from 'vue3-cookies'
import { getSession,setSession,removeAllItem,removeItem, getLocal} from '@/api/storage'

const props = defineProps(["list","name"])
const list = ref([])
// const emit = defineEmits(['Disappear'])
const turnFood = useshopfood() 
const {cookies} = useCookies()
const emit = defineEmits(["change"]);

const clear = ()=>{
    for(let i = 0;i < list.value.length;i ++){
        turnFood.singleShopNum[`${i}`] = 0
    }
    emit('change',turnFood.singleShopNum)
    list.value = []
    const name = props.name
    const user = getLocal('__user__','')
    let cart = turnFood.shoppingAll
    Reflect.deleteProperty(cart,`${name}`)
    cookies.set(`${user}`,JSON.stringify(cart),'2d')
    turnFood.shopTotal = 0
   turnFood.shopNum = 0
   turnFood.Disappear = false
   // const a = turnFood.oldshopNum(b)
   
}

const disappear = ()=>{
    turnFood.Disappear = false
}

onUnmounted(()=>{
    console.log(turnFood.singleShopNum['3'])
})
onBeforeMount(()=>{
    list.value = props.list
})
</script>
 
<style lang='scss' scoped>
 .d3{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: rgba(0,0,0,0.5);
    .cart{
        position: absolute;
        bottom: 0;
        
        width: 100%;
        .top{
            height: 7vw;
            background-color: #fffbde;
            border-top-left-radius: 5vw;
            border-top-right-radius: 5vw;
           display: flex;
           justify-content: center;
        }
        .box{
            background: white;
            .list{
                height: 237px;
                overflow: scroll;
            }
        }
    }
    // style="position:fixed;
    //             overflow: scroll;
    //             bottom:15px;"
 }
</style>