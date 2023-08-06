import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store/isPullUpLoad'
import '@/assets/scss/index.scss'
import ELementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import intallIcon from '@/icons'
// import directivePlugins from './plugins'
import { createPinia } from 'pinia'
import '@/utils/permission'

export const pinia = createPinia()
const app = createApp(App)

intallIcon(app)

app.use(ELementPlus).use(router).use(pinia).mount('#app')
