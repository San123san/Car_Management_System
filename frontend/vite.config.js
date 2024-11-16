// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//     },
//   },
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
    },
  },
  build: {
    outDir: 'backend/dist', // Set output directory for production build to your backend's 'dist' folder
    emptyOutDir: true, // Optional: clear the output directory before building
    assetsDir: '', // Optional: change this if you want assets to be in a specific folder
  },
  plugins: [react()],
})
