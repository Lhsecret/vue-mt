<template>
 
<div class="d1">finally</div>
<el-button @click="back">返回</el-button>
</template>
 
<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
const back = ()=>{
   router.push({
      name:'Layout'
   })
}

</script>
 
<style lang='scss' scoped>
 .d1{
    .d1{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: white;
 }
 }
</style>