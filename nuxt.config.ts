// https://nuxt.com/docs/api/configuration/nuxt-config

const cachePolicy = "public,max-age=31536000,s-maxage=31536000";

const mailConfig =
  process.env.NODE_ENV != "production"
    ? {
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
           user: process.env.TRAP_USER,
           pass: process.env.TRAP_PASS,
         },
       }
     : {
         service: "gmail",
         auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS,
         },
       };


export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mail: {
        jwt_secret: process.env.MAIL_JWT_SECRET,
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
      }
    }
  },

  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  compatibilityDate: '2025-04-06',

  modules: ["@nuxt/content", "@nuxt/image", "vue3-carousel-nuxt", "@nuxtjs/leaflet", "nuxt-mail"],

  css: ["~/assets/scss/main.scss", "~/assets/scss/fonts.scss"],

  mail: {
    message: {
      to: process.env.MAIL_TO || '',
    },
    smtp: mailConfig
  },

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