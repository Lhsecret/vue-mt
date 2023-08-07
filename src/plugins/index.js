import { createApp } from 'vue'
// import { useIntersectionObserver } from '@vueuse/core'
import loading from '@/components/base/loading'


export default{
    install(app){
        app.directive('loading', {
            //绑定指令的dom 挂载到页面上之后 调用 
            mounted(el, binding) {
              // el 指令绑定的dom元素
              // binding :value  value就是绑定值
              // 把loading组件转为真实dom  才能插入到绑定的dom元素中 
              const app = createApp(loading) //loading 组件应用对象  
              const instance = app.mount(document.createElement('div')) //loading组件的实例对象  instance.$el 就是真实dom 
              el.instance = instance
              if (binding.value) {
                append(el)
              }
            },
            // 有更新时调用 
            updated(el, binding) {
      
              if (binding.value !== binding.oldValue) {
                binding.value ? append(el) : removeEl(el)
              }
            },
          })
    }
}

function append(el) {
  // 把 真实dom 插入 指令绑定dom上  
  const style = getComputedStyle(el)
  let arr = ['absolute', 'fixed', 'relative']
  if (arr.indexOf(style.position) === -1) {
    //绑定的dom 没有定位样式 
    el.classList.add('g-relative')
  }
  el.appendChild(el.instance.$el)
}

function removeEl(el) {
  el.classList.remove('g-relative')
  el.removeChild(el.instance.$el)
}