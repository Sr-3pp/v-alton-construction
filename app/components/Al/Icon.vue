<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
</script>

<template lang="pug">
span.al-icon
  svg.al-icon__svg
    use(:href="`/icons/${name}.svg#s`")
</template>

<style scoped lang="scss">
.al-icon{
  display: inline-block;
  height: 100%;

  svg{
    fill: currentColor;
    width: 100%;
    height: 100%;
  }
}
</style>
