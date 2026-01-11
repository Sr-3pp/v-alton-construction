import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'pages/**'
    }),
    config: defineCollection({
      type: 'page',
      source: 'config/**'
    }),
    sliders: defineCollection({
      type: 'page',
      source: 'sliders/**'
    })
  }
})
