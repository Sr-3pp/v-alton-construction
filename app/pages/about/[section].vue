<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.path}`, () => queryCollection('content').path(`/pages${route.path}`).first(), {
  watch: [() => route.path]
})
const { data: extra } = await useAsyncData(`extra-${route.path}`, () => queryCollection('content').path(`/pages${route.path}/extra`).first(), {
  watch: [() => route.path]
})
useSeoMeta({
  title: page.value?.seo.title,
  description: page.value?.seo.description
})

definePageMeta({
  layout: false
})
</script>

<template lang="pug">
  NuxtLayout(name="submenu")
    template(#main) 
      ContentRenderer.content(v-if="page" :value="page")
    template(#extra)
      ContentRenderer.extra(v-if="extra" :value="extra")
</template>

<style scoped lang="scss">
.content{
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);

  @media #{$breakpoint-media-sm}{
    gap: pxToRem(40);
  }
}
</style>
