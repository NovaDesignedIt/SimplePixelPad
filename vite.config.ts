import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '192.168.2.196', // Replace with your actual IP address within the 192 network
    port: 9000, // Or any other port you want to use
  },
  plugins: [react()],
})


// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     host: 'localhost', // Replace with your actual IP address within the 192 network
//     port: 9000, // Or any other port you want to use
//   },
//   plugins: [react()],
// })
