import { defineConfig } from 'vite'
import injectRedirectsFile from './vite-plugins/VitePluginInjectRedirectsFile.js'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), injectRedirectsFile()],
})
