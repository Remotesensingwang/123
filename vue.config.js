const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pages: {
    index: {
      // 更改page 的入口
      entry: 'src/main.js',
  }
  },
  lintOnSave:false, //关闭语法检查

  	//开启代理服务器（方式一）
  // devServer: {
  //   proxy: 'http://localhost:5000'
  // },

  	//开启代理服务器（方式二）
	devServer: {
    proxy: {
      '/student': {
        target: 'http://localhost:5000',
				pathRewrite:{'^/student':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
      '/car': {
        target: 'http://localhost:5001',
				pathRewrite:{'^/car':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      }
    }
  }

})
