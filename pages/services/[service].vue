<script setup lang="ts">
const route = useRoute()

const service = route.params.service as string

const { data: main } = await useAsyncData(() => queryCollection('content').path(`/pages${route.path}`).first())
const { data: extra } = await useAsyncData(() => queryCollection('content').path(`/pages${route.path}/extra`).first())

const src = 'https://picsum.photos/600/400'

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
      AlServiceHeader(:src="main.meta.header.image" :alt="main.title")
        h1 {{ main.title }}
        p {{ main.meta.header.description }}
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
