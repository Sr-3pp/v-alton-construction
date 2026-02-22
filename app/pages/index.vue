<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path("/").first())
useSeoMeta({
  title: home.value?.seo.title,
  description: home.value?.seo.description
})
</script>

<template lang="pug">
ContentRenderer(v-if="home" :value="home")
div(v-else) Loading...
</template>

<style scoped></style>
