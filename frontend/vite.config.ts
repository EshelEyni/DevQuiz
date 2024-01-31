import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      strategies: "generateSW",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "assets/images/*.png",
        "assets/fonts/**/*.ttf",
      ],
      manifest: {
        name: "DevQuiz",
        short_name: "DevQuiz",
        start_url: "/",
        scope: ".",
        display: "standalone",
        background_color: "transparent",
        theme_color: "#4b5563",
        description:
          "DevQuiz is a quiz app for developers to test their knowledge on various topics in the web development.",
        dir: "ltr",
        orientation: "any",
        icons: [
          {
            src: "/assets/images/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/assets/images/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/assets/images/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/assets/images/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/assets/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|tiff|ttf|woff|woff2|eot)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-resources",
            },
          },
        ],
        navigateFallback: "/offline.html",
      },
    }),
  ],
});
