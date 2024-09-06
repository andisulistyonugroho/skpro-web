// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
import { md3 } from 'vuetify/blueprints'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000'
    }
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'SKPRO',
      meta: [
        { name: 'description', content: 'Biar gampang dilihat lagi' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Mulish&display=swap'
        }
      ]
    }
  },
  css: ['@/assets/main.scss'],
  modules: [
    'vuetify-nuxt-module',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@unocss/nuxt'
  ],
  vuetify: {
    moduleOptions: {
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'unocss-mdi',
      },
      blueprint: md3,
      theme: {
        defaultTheme: 'light',
      },
      labComponents: ['VDateInput']
    }
  }
})