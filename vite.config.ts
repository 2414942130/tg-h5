

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'


function createProxyTable() {
  const table = [
    { prefix: '/api_test', target: 'http://192.168.1.131:8052' },
    { prefix: '/api_middleware', target: 'http://192.168.1.131:8083' },
    { prefix: '/api_production', target: 'http://39.96.12.113:8989' },
    { prefix: '/api_face', target: 'http://192.168.1.131:8087' }
  ]

  // 显式指定 acc 的类型
  return table.reduce<Record<string, { target: string; changeOrigin: boolean; rewrite: (path: string) => string }>>((acc, item) => {
    const reg = new RegExp(item.prefix)
    acc[item.prefix] = {
      target: item.target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(reg, '')
    }
    return acc
  }, {})
}
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('aa', mode, env)
  return {
    base: env.VITE_PUBLIC_PATH, // 修改为你想要的打包路径
    build: {
      outDir: 'dist' // 指定打包输出目录，默认为 dist
    },
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@public': path.resolve(__dirname, 'public')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: createProxyTable()
    }
  }
})