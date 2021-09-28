import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需加载，加快加载的速度
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file
              return false
            }
            return `vant/es/${name}/index.css`
          }
        },
      ]
    })
  ],
  base:"./",//打包路径
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },
  server: {
    port: 4000,//启动端口
    open: true,
    proxy: {
      // 选项写法
      '/api': 'http://127.0.0.1:5000'//代理网址
    },
    cors:true
  }
})
