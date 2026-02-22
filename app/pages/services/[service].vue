<script setup lang="ts">
const route = useRoute()
const serviceSlug = computed(() => route.params.service as string)

const getPageByRoute = async (path: string) => {
  const byPrefixedPath = await queryCollection('content').path(path).first()
  if (byPrefixedPath) return byPrefixedPath
  return queryCollection('content').path(`/pages${path}`).first()
}

const isServiceMatch = (item: any, slug: string) => {
  const candidates = [item?.stem, item?.id, item?.path]
    .filter((value): value is string => typeof value === 'string')

  return candidates.some((value) =>
    value === slug ||
    value.endsWith(`/${slug}`) ||
    value.includes(`services/${slug}`)
  )
}

const { data: main } = await useAsyncData(`service-main-${route.path}`, () => getPageByRoute(route.path), {
  watch: [() => route.path]
})
const { data: serviceExtra } = await useAsyncData(`service-extra-json-${route.path}`, async () => {
  const items = await queryCollection('services').all()
  return items.find((item: any) => isServiceMatch(item, serviceSlug.value)) ?? null
}, {
  watch: [() => route.path]
})

console.log('Service Extra:', serviceExtra.value)

const serviceHeader = computed(() => {
  const data = main.value as any
  return data?.header ?? data?.meta?.header ?? {}
})

useSeoMeta({
  title: main.value?.seo.title,
  description: main.value?.seo.description,
})

definePageMeta({
  layout: false
})
</script>

<template lang="pug">
  NuxtLayout(name="submenu")
    template(#main)
      AlServiceHeader(v-if="main" :src="serviceHeader.image" :alt="main.title")
        h1 {{ main.title }}
        p {{ serviceHeader.description }}
      ContentRenderer.content(v-if="main" :value="main")
    template(#extra)
      Container.extra(:with-padding="true")
        AlServiceExtra(
          v-if="serviceExtra?.type === 'extra'"
          :title="serviceExtra.title"
          :items="serviceExtra.items"
          :image="serviceExtra.image"
        )
        AlServiceShowcase(
          v-else-if="serviceExtra?.type === 'showcase'"
          :items="serviceExtra.items"
        )
</template>

<style scoped lang="scss">
.al-service-header{
  margin-bottom: pxToRem(20);

  @media #{$breakpoint-media-sm}{
    margin-bottom: pxToRem(40);
  }
}

.content, .extra{
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);
}

.extra{
  padding-top: 0!important;
}
</style>
