//引入各种文件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/index.scss'
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import intallIcon from '@/icons'
import { createPinia } from 'pinia'
import '@/utils/permission'

export const pinia = createPinia()//导出pinia对象
const app = createApp(App)//创建app对象
intallIcon(app)//在app对象上放入新的组件
//为vue项目拓展功能
app.use(ELementPlus).use(router).use(pinia).mount('#app')
