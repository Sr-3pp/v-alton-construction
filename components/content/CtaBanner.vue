<script setup lang="ts">
defineProps<{
  label: string,
  href: string
}>();
</script>

<template lang="pug">
section.cta-banner
  Container(:with-padding="true")
    h3.cta-banner__title
      slot
    AlButton.cta-banner__button(href="/contact" label="Contact us")
</template>

<style scoped lang="scss">
.cta-banner{
  background-color: $color-primary-red;
  color: $color-white;
  .container{
    display: flex;
    justify-content: space-between;

    > *{
      color: currentColor;
    }
  }

  &__title{
    font-size: pxToRem(24);
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>
