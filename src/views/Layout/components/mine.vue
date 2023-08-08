<template>
 
<div class="d1">
    <div>
        <div class="top">
            <div class="img-content">
                <img src="./../../../assets/1.gif" alt="" style="width: 19.7vw; height: 19.7vw;">
                <div style="text-align: center; font-size: 4.4vw;"> efwoengwignw</div>
            </div>
           
        </div>
        <div class="middle">
            <div class="line" @click="turnAddress">
                <el-icon><Location /></el-icon>
                <span>收货地址</span>
                <el-icon><ArrowRight /></el-icon>
            </div>
            <div class="line">
                <el-icon><Star /></el-icon>
                <span>我的收藏</span>
                <el-icon><ArrowRight /></el-icon>
            </div>
            <div class="line">
                <el-icon><SwitchButton /></el-icon>
                <span @click="out">退出登录</span>
                <el-icon><ArrowRight /></el-icon>
                <el-dialog
                v-model="dialog"
                width="70%"
                style="margin-top: 60%;"
                >
                    <div>确定要退出吗？</div>
                    <template #footer>
                        <div>
                            <el-button @click="dialog = false">取消</el-button>
                            <el-button @click="confirm">确定</el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
        </div>
        <div class="bottom">
       <div class="d1" @click="turnLayout"><el-icon><HomeFilled /></el-icon></div>
       <div class="d1" @click="turnOrder"><el-icon><Ticket /></el-icon></div>
       <div class="d1"><el-icon><UserFilled /></el-icon></div>
    </div> 
    </div>
    <router-view></router-view>
</div>
  
</template>
 
<script setup>
import { SwitchButton,ArrowRight,HomeFilled,Ticket,UserFilled,Location,Star } from "@element-plus/icons-vue";
import {ref} from 'vue'
import {useuser} from '@/store/user'
import { useRouter } from "vue-router";

const router = useRouter()
const userStore = useuser()
const dialog = ref(false)
const out = ()=>{
    // userStore.Loginout()
    dialog.value = true
}

const turnLayout = ()=>{
    router.push({
        name:'Layout'
    })
}

const turnAddress = ()=>{
    router.push({
        name:'address'
    })
}

const turnOrder = ()=>{
    router.push({
        name:'order'
    })
}

const confirm = async()=>{
    userStore.Loginout()
    dialog.value = false
    router.push({
        name:'Layout'
    })
}
</script>
 
<style lang='scss' scoped>
 .d1{
    position: fixed;
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    .top{
        background-color: #ffd756;
        .img-content{
            padding: 10% 0 5%;
            margin: auto;
            img{
                margin-left: 40%;
                border: 4px solid #ffe699;
                border-radius: 50%;
            }
        }
    }
    .middle{
        .line{
            padding: 3vw;
            display: flex;
            align-items: center;
            i{
                color: darkgray;
            }
            span{
                margin-left: 3vw;
                margin-right: 65vw;
            }
        }
        // .middle .line:nth-child(2){
        //     border-bottom: 1px solid red;
        // }
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
 }
</style>