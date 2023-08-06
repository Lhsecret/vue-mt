import SvgIcon from '@/components/SvgIcon/SvgIcon'

// 完成svg的注册                    要检索的文件目录, 是否检索子文件夹, 正则 检索匹配规则
const svgRequired = require.context('./svg', false, /\.svg$/)

svgRequired.keys().forEach(icon => {
  svgRequired(icon) // 完成注册
})

export default (app) => {
  app.component('SvgIcon', SvgIcon)
}