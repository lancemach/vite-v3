import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import html from 'vite-plugin-html'
import externalGlobals from 'rollup-plugin-external-globals'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({ /* options */ }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],
    }),
    html({
      inject: {
        data: {
          title: 'vite-plugin-html-example',
          injectScript: '<script src="https://cdn.jsdelivr.net/npm/vue@3.2.16/dist/vue.global.prod.js"></script>', // 
        },
      },
      minify: true,
    })
  ],
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      // indicate which modules should be treated as external, 'ant-design-vue', 'dayjs'
      external: ['vue'],
      plugins: [
        externalGlobals({
          vue: 'Vue'
        })
      ]
    }
  },
})
