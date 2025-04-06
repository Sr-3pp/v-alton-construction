<script setup lang="ts">
const { hook } = useNuxtApp();

const loading = ref(true);

const { navigation, getSubmenu } = useNavigation()
const { data: nav } = await navigation

provide('navigation', nav)

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
  NuxtPage
AlFooter
</template>

<style scoped lang="scss">
  .main{

  }
</style>
