<script setup lang="ts">
const props = defineProps<{
  items: []
}>()

console.log('my items',props.items)
</script>

<template lang="pug">
.showcase
  .showcase__item(v-for="item in items" :key="item.id")
    figure.showcase__item__image
      NuxtImg(:src="item.thumb" alt="Showcase image")
    .showcase__item__content
      h3.showcase__item__title {{ item.title }}
      p.showcase__item__description {{ item.description }}
</template>

<style scoped lang="scss">
.showcase{
  position: relative;
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);

  &__item{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);

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

    &__content{
      background-color: rgba($color-primary-red, .6);
      backdrop-filter: blur(pxToRem(4)) brightness(.6);
      padding: pxToRem(20);
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: pxToRem(10);
      color: $color-white;

      @media #{$breakpoint-media-sm}{
        padding: pxToRem(40);
      }
    }

    &__title{
        font-size: pxToRem(32);
        font-weight: bold;
      }
  }
}
</style>
