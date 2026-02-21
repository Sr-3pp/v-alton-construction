<script setup lang="ts">
const route = useRoute()

const getPageByRoute = async (path: string) => {
  const byPrefixedPath = await queryCollection('content').path(path).first()
  if (byPrefixedPath) return byPrefixedPath
  return queryCollection('content').path(`/pages${path}`).first()
}

const { data: main } = await useAsyncData(`service-main-${route.path}`, () => getPageByRoute(route.path), {
  watch: [() => route.path]
})
const { data: extra } = await useAsyncData(`service-extra-${route.path}`, () => getPageByRoute(`${route.path}/extra`), {
  watch: [() => route.path]
})

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
        ContentRenderer.extra(v-if="extra" :value="extra")
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
