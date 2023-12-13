import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        description: 'Purin Playah | houndlings.com',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'jiggle-logo.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'jiggle-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'jiggle-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    react(),
  ],
})
