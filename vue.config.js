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
      '/car': {
        target: 'http://localhost:5001',
				pathRewrite:{'^/car':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
      '/place/v2/search?query=4A%E6%99%AF%E5%8C%BA&tag=%E6%97%85%E6%B8%B8%E6%99%AF%E7%82%B9&region=%E6%AD%A6%E6%B1%89&output=json&ak=M0BSRvYgSAsRMdO6AUxG9FDkDfChgAoG': {
        target: 'http://api.map.baidu.com'
      },
      '/api/students': {
        target: 'http://localhost:5003',
        // ws:false
      },
    }
  }

})
