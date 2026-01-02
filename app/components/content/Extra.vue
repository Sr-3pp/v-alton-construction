<script setup lang="ts">
defineProps<{
  title: string
  items: string[]
  image: string
}>()
</script>

<template lang="pug">
section.extra
  Container
    AlGrid
      AlGridCol(size="1" size-sm="2/3")
        figure.extra__image
          NuxtImg(:src="image" :alt="title")
      AlGridCol(size="1" size-sm="1/3")
        h4.extra__title {{ title }}
        ul.extra__list
          li.extra__list__item(v-for="item in items" :key="item") 
            span.extra__list__item__selector ▶
            | {{ item }}
</template>

<style scoped lang="scss">
.extra{
  &__image{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title{
    font-size: pxToRem(24);
    font-weight: 700;
    margin-bottom: pxToRem(20);
    color: $color-primary-red;
  }

  &__list{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);

    &__item{
      display: flex;
      gap: pxToRem(10);
      align-items: center;
      color: $color-gray-500;

      &__selector{
        font-size: pxToRem(20);
        color: $color-primary-yellow;
      }
    }
  }
}
</style>
