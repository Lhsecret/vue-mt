<template>
 
    <div class="d1">
        <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="form"
        style="max-width: 460px"
        class="form"
        ref="FormRef"
        >
            <el-form-item label="收货地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
        </el-form>
        <div class="button">
            <el-button @click="confirm" type="success"  style="background-color: #ffce34; width: 30vw; color: black;">保存</el-button>
            <el-button @click="Deletefn" type="primary"  style="background-color: #f5f5f5; width: 30vw; color: black;">删除</el-button>
            <el-button @click="back" type="primary" style="background-color: #f5f5f5; width: 30vw; color: black;">返回</el-button>
        </div>
    </div>
      
    </template>
     
    <script setup>
    import router from '@/router';
    import {ref,onMounted} from 'vue'
    import {confirmMine,deleteFn,getAddress} from '@/api/mine'
    import useshopfood from '@/store/shopAndfood'
    import { onBeforeRouteLeave } from 'vue-router';
    const turnFood = useshopfood()
   
    const FormRef = ref(null)
    const props = defineProps(['Single'])
   //设置表单的响应式数据
    const form = ref({
        contacts:props.Single.contacts,
        phone:props.Single.phone,
        address:props.Single.address
    })
    //保存地址信息
    const confirm = async()=>{
       
        await confirmMine(form.value)
   
    }
    //删除地址信息
    const Deletefn = async()=>{
   
       console.log(form.value.address)
       const {data} = await deleteFn(form.value)
   
       console.log(data)
       router.go(-1)
    }
    //路由返回
    const back = ()=>{
        router.push({
            name:'address'
        })
    }
    //在路由跳转前的操作
    onBeforeRouteLeave(async(to,from,next)=>{
        console.log("123")
        const {data} = await getAddress()
      
        turnFood.Address = data.data
        next()
    })

    
    </script>
     
    <style lang='scss' scoped>
     .d1{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        .form{
            margin-top: 5vw;
        }
        .button{
            margin-left: 3vw;
        }
     }
    </style>