<template>
    <!-- 新增收货地址 -->
   <div class="d1">
       <div class="top">
           <el-icon @click="back"><ArrowLeft /></el-icon>
           <span>地址列表</span>
       </div>
       <hr>
       <div class="big-box">
           <div
           v-for="item in turnFood.Address"
           :key="item"
           class="small-box"
           >
            <p style="margin-bottom: 1vw; font-size: 4.5vw;">{{ item.address }}</p>
            <div style="display: inline-block; font-weight: 300;">
                <span>{{ item.contacts }}</span>
                <span style="margin-left: 3vw;">{{ item.phone }}</span>
            </div>
            <el-icon style="position: absolute; right: 5vw; font-size: 5vw;" @click="turn(item)"><EditPen /></el-icon>
            </div>
       </div>
       <div class="bottom">
            <div class="together" @click="newAddress">
                <el-icon><CirclePlus /></el-icon>
                <span>新增收货地址</span>
            </div>
       </div>
   </div>
   <router-view :Single="single" :key="route.path"></router-view>
   </template>
    
   <script setup>
   import {ArrowLeft,EditPen,CirclePlus} from '@element-plus/icons-vue'
   import router from '@/router';
   import { useRoute } from 'vue-router';
   import {getAddress,deleteFn} from '@/api/mine'
   import useshopfood from '@/store/shopAndfood'
   import { onBeforeMount,onMounted,ref,onUnmounted } from 'vue';

   const turnFood = useshopfood() 
   const route = useRoute()
  
   const single = ref({})
   const newAddress = ()=>{
    router.push({
        name:'newaddress'
    })
   }

   const back = ()=>{
    router.push({
        name:'mine'
    })
   }


    const turn = (item)=>{
        single.value = item
        router.push({
            name:'oldaddress'
        })
    }

    onUnmounted(()=>{
        console.log("abc")
    })
   

   onBeforeMount(async()=>{
    const {data} = await getAddress()
    turnFood.Address = data.data
    
   })
   </script>
    
   <style lang='scss' scoped>
    .d1{
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background-color: white;
       z-index: 60;
       .top{
        width: 100%;
        height: 15vw;
            .el-icon{
                padding: 5vw;
            }
       }
       .bottom{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 15vw;
        border-top: 1px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        .together{
            display: flex;
            align-items: center;
        }
       }
       .big-box{
        .small-box{
            margin-left: 5vw;
            margin-top: 3vw;
            padding-bottom: 3vw;
            border-bottom: 1px solid #E4E4E4;

        }
       }
    }
   </style>