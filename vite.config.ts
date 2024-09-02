import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock' 
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    let env = loadEnv(mode, process.cwd())
    return {
        base: './',
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                symbolId: 'icon-[dir]-[name]'
            }),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve'
            }),
            visualizer({
                // emitFile: true,
                // filename: "stats.html",
                open: true,  // 打包后自动打开页面
                gzipSize: true,  // 查看 gzip 压缩大小
                brotliSize: true // 查看 brotli 压缩大小
            }) 
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        // scss 配置全局变量
        // scss: {
        //     additionalData: `@import "@/assets/css/variable.scss";`
        // }
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/assets/css/variable.scss";`
                }
            }
        },
        server: {
            proxy: {
                [env.VITE_APP_BASE_URL]: {
                    target: env.VITE_APP_SERVER_URL,
                    // 需要代理跨域
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: ({ name }) => {
                        
                        if (name.endsWith('.css')) {
                            return 'css/[name].[hash].[ext]'
                        }
                        if (['.png', '.jpg', '.jpeg', '.gif', '.svg', 'webp'].some(item => name.endsWith(item))) {
                            return 'img/[name].[hash].[ext]'
                        }
                        return '[ext]/[name].[hash].[ext]'
                    },
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            let name = id.split('node_modules/')[1].split('/')[0];
                            return name.replace('@', '')
                        }
                    }
                }
            }
        }
    }
})
