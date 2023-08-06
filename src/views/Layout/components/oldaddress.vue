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
    // import router from '@/router';
    const FormRef = ref(null)
    const props = defineProps(['Single'])
    // const emit = defineEmits(["change"])
    const form = ref({
        contacts:props.Single.contacts,
        phone:props.Single.phone,
        address:props.Single.address
    })
    const confirm = async()=>{
        // console.log(form.value)
        await confirmMine(form.value)
    // console.log(a)
    }
    const Deletefn = async()=>{
    //    console.log(val)
    //    const params = {address:val}
    //    console.log(params)
       console.log(form.value.address)
       const {data} = await deleteFn(form.value)
    //    const result = await getAddress()
    //    const p = result.data.data
    //    emit('change',p)
       console.log(data)
       router.go(-1)
    }

    const back = ()=>{
        router.push({
            name:'address'
        })
    }
    onBeforeRouteLeave(async(to,from,next)=>{
        console.log("123")
        const {data} = await getAddress()
        // console.log(data)
        turnFood.Address = data.data
        next()
    })

    // beforeRouteLeave(async(to,from,next)=>{
    //     const {data} = await getAddress()
    //     console.log(data)
    //     turnFood.Address = data.data
    //     console.log('123')
    //     next()
    // })
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