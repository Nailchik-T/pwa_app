import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {type ManifestOptions, VitePWA} from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#ffffff",
  background_color: "#2EC6FE",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru-RU",
  name: "AsterX",
  short_name: "AsterX",
  screenshots:[
      {
      sizes: "3456x2234",
      src: "desktop.png",
      type: "image/png", form_factor: "wide"
      },
    {
      sizes: "780x1692",
      src: "mobile.png",
      type: "image/png",
      form_factor: "narrow"
    },
  ]
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
    registerType: 'autoUpdate',
      workbox:{
       globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      manifest: manifest
  })],
})
