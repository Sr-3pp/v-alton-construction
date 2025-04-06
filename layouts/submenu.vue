<script setup lang="ts">
const route = useRoute()

const { navigation, getSubmenu } = useNavigation()
const { data: nav } = await navigation

provide('navigation', nav)
const submenu = getSubmenu((route.name as string).split('-')[0], nav.value as [])


const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(`/pages${route.path}`).first()
})

const { data: licences } = await useAsyncData('licences', () => {
  return queryCollection('config').path('/config/licences').first()
})

const banner = ref<string | null>(page.value!.meta.banner as string || '')

const { hook } = useNuxtApp();
const loading = ref(true);
const Navbar = ref();

hook("page:start", () => {
  loading.value = true
  if (Navbar.value) {
    Navbar.value.toggle()
  }
})

hook("page:transition:finish", () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
hook("page:finish", () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})

watch(route, async () => {
  banner.value = ''
  const data = await queryCollection('content').path(route.path).first()

  banner.value = data.meta.banner as string
})
</script>

<template lang="pug">
AlLoader(v-if="loading")
AlNavbar(ref="Navbar")
.main
  Banner(:banner="banner" v-if="banner")
  Container.content(:with-padding="true")
    AlGrid
      AlGridCol(size="1" size-sm="1/4")
        AlSubmenu(:submenu="submenu")
        AlLicences(:licences="licences.body")
      AlGridCol(size="1" size-sm="3/4")
        slot(name="main")
  slot(name="extra")
AlFooter
</template>

<style scoped lang="scss">
.main{
  .al-submenu{
    margin-bottom: pxToRem(20);
  }
}
</style>
