const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy: 'http://localhost:5252'//请求后端地址
  },
  css: {
    loaderOptions: {
      sass: {
        // 加载每个组件sass前我预先执行的代码   sass-loader 版本8  prependData 
        additionalData: 
        `@import "@/assets/scss/variable.scss";
        @import "@/assets/scss/mixin.scss";`
        
      }
    }
  },

  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // 将处理svg的loader添加exclude,表示不需要使用该loader处理icon。
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/icons'))
      .end()
    config.module
      .rule('icons') // 添加一个新的loader  匹配src/icons内的 svg文件  
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({// 指定symbolId 不指定则默认为svg文件名 识别到icon-user 回去找 user.svg
        symbolId: 'icon-[name]'
      })
      .end()
  }

})
