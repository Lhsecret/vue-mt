<template>
 
<div class="d1">
    <div class="login-content">
        <p>欢迎登录美团</p>
        <el-form :model="loginForm" class="login-form" :rules="rules" ref="formRef">
            <el-form-item prop="username">
                <span> 用户名：</span>
                <el-input  v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span> 密码：</span>
                <el-input  v-model="loginForm.password"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" style="width: 100%;" @click="loginFn1" class="button">登录</el-button>
        <el-button type="primary" style="width: 100%;" @click="loginFn2" class="button">check</el-button>
    </div>
</div>
  
</template>
 
<script setup>
import {ref,computed} from 'vue'
import { validatePassword } from "./validate";
import { ElMessage } from "element-plus";
import {useuser} from '@/store/user'
import { formateTime } from '@/views/login/formateTime'
import {getLocal,setLocal} from '@/api/storage'
import { getSession,setSession,removeAllItem} from '@/api/storage'
const userStore = useuser()
const formRef = ref(null)
const loginForm = ref({
    username: "root2",
    password: "R123456",
})


const rules = ref({
    username: [{ required: true, message: "用户名是必填项", trigger: "blur" }],
    password: [
    { required: true, message: "密码是必填项", trigger: "blur" },
    {  validator: validatePassword,trigger: "blur" },
  ],
})

const loginFn1 = ()=>{
    formRef.value.validate((valid)=>{
        if(valid){
          
            userStore.Username = loginForm.value.username
            userStore.loginFn(loginForm.value)
            setLocal('__user__',loginForm.value.username)
            userStore.nowtime = new Date().getTime()
            formateTime()
            setSession('__future__',userStore.future)
          
        }else{
            ElMessage({
                message: "填写不规范",
                type: "warning",
            });
        }
    })
}


const loginFn2 = ()=>{
    userStore.checkLoginFn().then((data)=>{
        console.log(data)
    })

}


</script>
 
<style lang='scss' scoped>
.d1{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    position: relative;
    justify-content: center;
    .login-content{
        position: absolute;
        top: 40vw;
        p{
            text-align: center;
            font-size: 6vw;
            margin-bottom: 6vw;
        }
        button{
            margin-top: 4vw;
        }
    }
}
</style>