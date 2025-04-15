<script setup lang="ts">
const props = defineProps<{
  label: string,
  href?: string,
  disabled?: boolean,
  loading?: boolean
}>();

</script>

<template lang="pug">
div.al-button
  AlLoader.al-button__loader(v-if="loading")
  NuxtLink(v-if="href" :to="href" :disabled="disabled")
    span {{ label }}
  button(v-else :disabled="disabled")
    span {{ label }}
</template>

<style scoped lang="scss">
.al-button{
  position: relative;
  display: flex;
  flex-shrink: 1;
  flex-grow: 0;
  button, a{
    width: 100%;
    padding: pxToRem(16);
    border: none;
    background-color: $color-primary-yellow;
    color: $color-gray-900;
    text-decoration: none;
    border-radius: pxToRem(8);
    font-size: pxToRem(18);

    &[disabled]{
      background-color: $color-gray-400;
      color: $color-gray-900;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  span{
    white-space: nowrap;
  }

  &__loader{
    --spinner-width: #{pxToRem(4)};
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
}
</style>
