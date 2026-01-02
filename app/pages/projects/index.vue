<script setup lang="ts">
const { data: page } = await useAsyncData(() => queryCollection('content').path('/pages/projects').first())
const { data: extra } = await useAsyncData(() => queryCollection('content').path('/pages/projects/extra').first())
const { data: _projects } = await useAsyncData(async () => {
  const nav = await queryCollectionNavigation('content', ['meta']).where('stem', 'LIKE', '%projects/%')
  return nav[0].children
})

const projects = _projects.value![0].children

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
    AlGrid.projects
      template(v-for="(project, i) in projects" )
        AlGridCol(v-if="i != 0" :key="project.id" size="1/2" size-sm="1/3")
          NuxtLink(:to="project.path.replace('/pages', '')")
            AlServiceCard(:image="project.meta.header.image" :title="project.title")
    ContentRenderer.content(v-if="page" :value="page")
  template(#extra)
    ContentRenderer.extra(v-if="extra" :value="extra")
</template>

<style scoped lang="scss">
.projects{
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
