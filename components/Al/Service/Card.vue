<script setup lang="ts">
defineProps<{
  image: string,
  title: string,
}>()
</script>

<template lang="pug">
article.al-service-card
  NuxtImg(:src="image" :alt="title")
  .al-service-card__title
    h3 {{ title }}

</template>

<style scoped lang="scss">
.al-service-card{
  position: relative;
  display: flex;
  overflow: hidden;
  aspect-ratio: 1;

  img{
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  &__title{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 25%;
    background: linear-gradient(90deg, rgba($color-primary-red, .8) 0%, rgba($color-primary-red, .1) 100%);
    transition: max-height 0.3s ease-in-out;
    h3{
      padding: pxToRem(10);
      color: $color-text-light;
      font-size: pxToRem(14);
      font-weight: normal;
    }
  }

  &:hover{
    .al-service-card__title{
      max-height: 100%;
    }
    img{
      filter: grayscale(100%) blur(2px) brightness(0.4); ;
      transform: scale(1.05);
    }
  }
}
</style>
