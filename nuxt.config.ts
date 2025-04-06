// https://nuxt.com/docs/api/configuration/nuxt-config

const cachePolicy = "public,max-age=31536000,s-maxage=31536000";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mail: {
        endpoint: process.env.NODE_ENV === 'production' ?  process.env.MAIL_ENDPOINT : process.env.MAIL_DEV_ENDPOINT,
        jwt_secret: process.env.MAIL_JWT_SECRET,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
      }
    }
  },
  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  compatibilityDate: '2025-04-06',

  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "vue3-carousel-nuxt",
    "@nuxtjs/leaflet",
  ],

  css: ["~/assets/scss/main.scss", "~/assets/scss/fonts.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/scss/tokens.scss" as *;
          @use "@/assets/scss/functions/index.scss" as *;
          `,
        },
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/img/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/gsap/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/_nuxt/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      }
    },
  }
});