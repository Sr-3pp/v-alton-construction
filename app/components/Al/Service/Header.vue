<script setup lang="ts">
defineProps({
  src: String,
  alt: String
})
</script>

<template lang="pug">
article.al-service-header
  figure.al-service-header__image
    NuxtImg(:src="src" :alt="alt")
  .al-service-header__content
    slot
</template>

<style scoped lang="scss">
.al-service-header{
  color: $color-text-light;
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);
  position: relative;
  height: pxToRem(300);

  &__image{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content{
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    width: 50%;
    height: 100%;
    padding: pxToRem(20);
    margin-left: auto;
    position: relative;
    background: linear-gradient(90deg, rgba($color-primary-red, .6) 0%, rgba($color-primary-red, 1) 100%);

    > *{
      color: currentColor
    }
  }
}
</style>
