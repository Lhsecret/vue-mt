<template>
 
<div class="d1">
   <div class="top">
      <el-icon @click="goback"><ArrowLeftBold /></el-icon>
   </div>
   <div class="bao">
   <el-select 
   v-model="value" 
   placeholder="综合排序"
   size="large" 
   filterable 
  
   class="m2"
   @change="changeList"
   >
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      />
   </el-select>
   <Scroll class="d2" :tip="2" @shopList="shopFn2">
      <ul class="u1">
         <li
      v-for="item in shopMessage"
      :key="item._id"
      class="big-box"
      @click="turnfood(item)"
      >
         <div class="img">
            <img :src=item.pic alt="" style="width: 14vw; height: 14vw; border-radius: 4vw;">
         </div>
         <div class="shop">
            <p style="font-size: 5vw;">{{ item.name }}</p>
            <div>
               <span style="color: red; font-size: 3.5vw; margin-right: 2vw;">{{ item.score }}</span>
               <span style="font-size: 3.5vw; margin-right: 2vw;">{{ item.price }}</span>
               <span style="font-size: 3.5vw;">{{ item.sales }}</span>
               
            </div>
            <div>
            </div>
            <span style="font-size: 3.5vw; color: darkgray;">{{ item.time }}</span>
            <span style="font-size: 3.5vw; color: darkgray; margin-left: 17vw;">{{ item.message }}</span>
         </div>
         <div class="food">
           <div>
            <div>
               <div><img :src=item.foodList.foodList[0].foodimg alt="" style="width: 24vw; height: 18vw;"></div>
           </div>
           <p style="font-size: 3.5vw;">{{ item.foodList.foodList[0].foodname }}</p>
           <p style="font-size: 5vw; font-weight: 500;">￥{{ item.foodList.foodList[0].price }}</p>
           </div>

           <div>
            <div>
               <div><img :src=item.foodList.foodList[1].foodimg alt="" style="width: 24vw; height: 18vw;"></div>
           </div>
           <p style="font-size: 3.5vw;">{{ item.foodList.foodList[1].foodname }}</p>
           <p style="font-size: 5vw; font-weight: 500;">￥{{ item.foodList.foodList[1].price }}</p>
           </div>

           <div>
            <div>
               <div><img :src=item.foodList.foodList[2].foodimg alt="" style="width: 24vw; height: 18vw;"></div>
           </div>
           <p style="font-size: 3.5vw;">{{ item.foodList.foodList[2].foodname }}</p>
           <p style="font-size: 5vw; font-weight: 500;">￥{{ item.foodList.foodList[2].price }}</p>
           </div>
           
         </div>
      </li>
      <div class="bottom-loading" v-if="turnFood.showshopLoading">
            <img width="24" height="24" src="../../components/base/loading/loading.gif" />
            <span>正在加载中</span>
        </div>
      <div class="bottom-tips" v-if="turnFood.showshopEnd">
            已经到底了
        </div>
        
      </ul>
      
   </Scroll>

   </div>
   
</div>

</template>
 
<script setup>
import { useRoute,useRouter } from 'vue-router';
import { ArrowLeftBold } from "@element-plus/icons-vue";
import {ref,computed,onMounted, nextTick,watch} from 'vue'
import {getsearchshop} from '@/api/shop'
import useisPullUpLoad from '@/store/isPullUpLoad'
import Scroll from "@/components/base/scroll";
import useshopfood from '@/store/shopAndfood'
import { getSession,setSession,removeAllItem,removeItem} from '@/api/storage'
// 距离优先 评分优先 人均低到高 速度优先
const value = ref(null)
const options = [
  
   {
      value: '时间优先',
      label:'时间优先'
   },
   {
      value: '评分优先',
      label:'评分优先'
   },
  
   
   
]
const turnFood = useshopfood()

const turnshowShop = useisPullUpLoad()
const route = useRoute()
const router = useRouter()
const shopMessage = ref([])
const shopfood = ref([])
// const fn = async(a)=>{
//     const b = await getsearchshop(a)
//     console.log(b)
// }

const goback = ()=>{
   router.go(-1)
   removeItem('__showShop__')
}

const changeList = ()=>{
   const item = options.find(item1 => item1.value === value.value)
   const message = [...shopMessage.value]
   console.log(message)
   if(item.label === '评分优先'){
      message.sort((a,b)=> parseFloat(b.score) - parseFloat(a.score))
      shopMessage.value = message
      return
   }
   if(item.label === '时间优先'){
      message.sort((a,b)=> parseFloat(a.score) - parseFloat(b.score))
      shopMessage.value = message
      return
   }
}

const turnfood = (item)=>{
   // nextTick()
   turnFood.showFood = item
   // turnFood.showFood = item.foodList.foodList
   // const middle = item
   // turnFood.showFood['main'] = `${middle}`

   // const b = Every.value.name
    turnFood.shopTotal = turnFood.oldshopTotal(item.name)
   turnFood.shopNum = turnFood.oldshopNum(item.name)
   // const a = turnFood.oldshopNum(b)
   turnFood.shoppingCart = turnFood.oldshoppingCart(item.name)
   turnFood.shoppingAll =  turnFood.oldshoppingAll()
   // const b = turnFood.oldSingleShop(item.name)

   // for(let i in )
   // turnFood.singleShopNum = turnFood.oldSingleShop(item.name)
   // console.log(turnFood.shoppingAll)
   // console.log(turnFood.shoppingCart)
   // console.log(turnFood.singleShopNum)
   // console.log(JSON.parse(JSON.stringify(turnFood.singleShopNum)))
   router.push({
      name:'food',
      
   })

   removeItem('__showShop__')
}


const shopFn2 = (arr)=>{
   for( let item of arr){
      shopMessage.value.push(item)
   }
   setSession("__showShop__",shopMessage.value)
}


onMounted(()=>{
   let arr = getSession("__showShop__",[])
   if(arr.length === 0){
      const middle = [...turnshowShop.showShop]
   
   const a = middle.splice(0,4)
 
   turnFood.copyshop = middle
   shopMessage.value = turnshowShop.showShop.slice(0,4)
   setSession("__showShop__",a)
   }else{
      shopMessage.value = arr
   }


})
</script>
 
<style lang='scss' scoped>
 .d1{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background-color:#f5f5f5;
    padding: 3vw;
    
    .top{
      padding: 3vw;
      margin-bottom: 4vw;
      background-color: white;
    }
    .bao{
      position: fixed;
      top: 14vw;
      left: 0;
      right: 0;
      bottom: 0;
      // overflow: scroll;
      margin-top: 3vw;
      .m2{
         margin-left: 2.5vw;
         width: 30vw;
         font-size: 10px;
      }
      .d2{
      height: 100%;
      overflow: hidden;
      background: color #f5f5f5;;
      padding: 4vw;
      .bottom-loading{
        display: flex;
        height: 8vw;
        justify-content: center;
        align-items: center;
    }
    .bottom-tips{
        text-align: center;
    }
    .u1{
      .big-box{
      display: flex;
      flex-wrap: wrap;
      border-radius: 5vw;
      padding: 3vw;
      background-color: white;
      margin-bottom: 3vw;
         .shop{
            width: 65vw;
         }
         .food{
            text-align: center;
            display: flex;
         }
    }
    }

    }
    }
 }
</style>