<script setup lang="ts">
const { data: page } = await useAsyncData(() => queryCollection('content').path('/pages/services').first())
const { data: extra } = await useAsyncData(() => queryCollection('content').path('/pages/services/extra').first())
const { data: _services } = await useAsyncData(async () => {
  const nav = await queryCollectionNavigation('content', ['meta']).where('stem', 'LIKE', '%services/%')
  return nav[0].children
})

const services = _services.value![0].children

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
    AlGrid.services
      template(v-for="(service, i) in services" )
        AlGridCol(v-if="i != 0" :key="service.id" size="1/2" size-sm="1/3")
          NuxtLink(:to="service.path.replace('/pages', '')")
            AlServiceCard(:image="service.meta.header.image" :title="service.title")
    ContentRenderer.content(v-if="page" :value="page")
  template(#extra)
    ContentRenderer.extra(v-if="extra" :value="extra")
</template>

<style scoped lang="scss">
.services{
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
</style>
