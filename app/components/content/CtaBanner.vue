<script setup lang="ts">
withDefaults(defineProps<{
  label?: string,
  href?: string
}>(), {
  label: 'Contact us',
  href: '/contact'
})
</script>

<template lang="pug">
section.cta-banner
  Container(:with-padding="true")
    h3.cta-banner__title
      slot
    AlButton.cta-banner__button(:href="href" :label="label")
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
