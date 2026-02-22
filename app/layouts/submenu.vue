<script setup lang="ts">
const route = useRoute()

const { navigation, getSubmenu } = useNavigation()
const { data: nav } = await navigation

provide('navigation', nav)
const submenu = computed(() => getSubmenu((route.name as string).split('-')[0] as string, (nav.value ?? []) as []) ?? [])


const { data: page } = await useAsyncData(() => `submenu-page-${route.path}`, () => {
  return queryCollection('content').path(`/pages${route.path}`).first()
}, {
  watch: [() => route.path]
})

const { data: licences } = await useAsyncData('licences', () => {
  return queryCollection('licences').all()
})

const banner = computed<string | null>(() => {
  const data = page.value as any
  return data?.meta?.banner ?? data?.meta?.header?.image ?? data?.header?.image ?? null
})

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
</script>

<template lang="pug">
AlLoader(v-if="loading")
AlNavbar(ref="Navbar")
.main
  Banner(:banner="banner" v-if="banner")
  Container.content(:with-padding="true")
    AlGrid
      AlGridCol(size="1" size-sm="1/4")
        AlSubmenu(:submenu="submenu || []")
        AlLicences(:licences="licences || []")
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
