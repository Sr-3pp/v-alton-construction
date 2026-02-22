import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const sliderConfigAttributes = {
  itemsToShow: z.number(),
  wrapAround: z.boolean(),
  autoplay: z.number(),
  pagination: z.boolean(),
  navigationEnabled: z.boolean()
}

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '/'
      },
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        slug: z.string().optional(),
        client: z.string().optional(),
        project: z.string().optional(),
        layout: z.string().optional(),
        gallery: z.array(z.string()).optional()
      }),
    }),
    contact: defineCollection({
      type: 'data',
      source: 'contact/**.json',
      schema: z.object({
        tels: z.array(z.string()),
        emails: z.array(z.string().email()),
        address: z.string(),
        map: z.object({
          center: z.tuple([z.number(), z.number()]),
          marker: z.tuple([z.number(), z.number()]),
          zoom: z.number()
        }),
        social: z.array(z.object({
          name: z.string(),
          url: z.string().url()
        })),
        hours: z.array(z.object({
          day: z.string(),
          hours: z.string()
        }))
      })
    }),
    licences: defineCollection({
      type: 'data',
      source: 'licences/**.json',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        url: z.string()
      })
    }),
    slider_config: defineCollection({
      type: 'data',
      source: 'sliders/config/**.json',
      schema: z.object({
        ...sliderConfigAttributes,
        breakpoints: z.record(
          z.string(),
          z.object(sliderConfigAttributes).partial()
        ).optional()
      })
    }),
    slides: defineCollection({
      type: 'page',
      source: 'sliders/slides/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        cta: z.object({
          label: z.string(),
          href: z.string().url()
        }),
        sources: z.object({
          xs: z.string().optional(),
          sm: z.string().optional(),
          md: z.string().optional(),
        }),
        config: z.object({
          alignment: z.enum(['left', 'center', 'right']).optional(),
        })
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/**/*.json',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string(),
        layout: z.string().optional(),
        client: z.string().optional(),
        project: z.string().optional(),
        gallery: z.array(z.string()).optional()
      })
    }),
    services: defineCollection({
      type: 'data',
      source: 'services/**/*.json',
      schema: z.object({
        image: z.string().optional(),
        title: z.string().optional(),
        type: z.enum(['extra', 'showcase']).optional(),
        items: z.array(z.string()).optional()
      })
    })
  }
})
