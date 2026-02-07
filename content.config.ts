import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'pages/**',
      schema: z.object({
        image: z.string().optional(),
        client: z.string().optional(),
        project: z.string().optional(),
        layout: z.string().optional(),
        gallery: z.array(z.string()).optional()
      })
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
