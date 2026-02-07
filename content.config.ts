import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'pages/**',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        slug: z.string().optional(),
        client: z.string().optional(),
        project: z.string().optional(),
        layout: z.string().optional(),
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
