import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())

  return {
    __APP_ENV__: env.__APP_ENV__,
    envDir: "./src/",
    plugins: [
      react(),
      svgr()
    ],
    root: "./",
    publicDir: "public",
    server: {
        watch: {
            usePolling: true,
        },
    },
  }
})
