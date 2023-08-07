import { createRouter, createWebHistory } from 'vue-router'
import useshopfood from '@/store/shopAndfood'

import { createPinia } from 'pinia'

const pinia = createPinia()
const turnFood = useshopfood(pinia)

const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/Layout',
  },
  {
    path:'/Layout',
    name:'Layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout/Layout.vue'),
    children:[
      {
        path: "meishi",
        name:'meishi',
        component: () => import(/* webpackChunkName: "meishi" */ '@/views/meishi/meishi.vue'),
      },
      {
        path:'isshow',
        name:'isshow',
        component: () => import(/* webpackChunkName: "isshow" */ '@/views/search-input/showSearch.vue'),
        children:[
          {
            path:"search",
            name:"search",
            component: () => import(/* webpackChunkName: "search" */ '@/views/search/search.vue'),
          },
        ]
      },
      {
        path:'food',
        name:'food',
        component: () => import(/* webpackChunkName: "food" */ '@/views/food/food.vue'),
        children:[
          {
            path:"finally",
            name:"finally",
            component: () => import(/* webpackChunkName: "finally" */ '@/views/finally/finally.vue'),
          },
        ]
      },
    
      {
        path:'123456',
        name:'number',
        component: () => import(/* webpackChunkName: "number" */ '@/views/number/number.vue'),
        
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
  },
  {
    path:'/404',
    name:'404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/ErrorPage/404.vue'),
  },
  {
    path:'/mine',
    name:'mine',
    component: () => import(/* webpackChunkName: "mine" */ '@/views/Layout/components/mine.vue'),
    children:[
      {
        path:'address',
        name:'address',
        component: () => import(/* webpackChunkName: "address" */ '@/views/Layout/components/address.vue'),

        children:[
          {
            path:'newaddress',
            name:'newaddress',
            component: () => import(/* webpackChunkName: "newaddress" */ '@/views/Layout/components/newaddress.vue'),
        
          },
          {
            path:'oldaddress',
            name:'oldaddress',
            component: () => import(/* webpackChunkName: "oldaddress" */ '@/views/Layout/components/oldaddress.vue'),
            
          }
        ]
      }
    ]
  },
  {
    path:'/order',
    name:'order',
    component: () => import(/* webpackChunkName: "order" */ '@/views/Layout/components/order.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
