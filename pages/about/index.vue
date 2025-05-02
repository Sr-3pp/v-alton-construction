<script setup lang="ts">
const { data: page } = await useAsyncData(() => queryCollection('content').path('/pages/about').first())
const { data: extra } = await useAsyncData(() => queryCollection('content').path('/pages/about/extra').first())
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

<style lang="scss">
.content{
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);

  @media #{$breakpoint-media-sm}{
    gap: pxToRem(40);
  }

  ul{
    padding-left: pxToRem(20);
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    li{
      list-style: disc;
    }
  }
}
</style>
