<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const { data } = await useAsyncData(async () => {
  const query = await queryCollection('sliders').where('path', 'LIKE', `%/sliders/${props.name}%`).all()
  const config = query.shift()

  return {
    slides: query,
    config: config!.meta
  }
})

const { slides, config }: any = data.value

const SlideKind = computed(() => {
  return defineAsyncComponent(() => import(`@/components/Al/Slide/${props.name[0].toUpperCase() + props.name.substring(1)}.vue`))
})
</script>

<template lang="pug">
.al-slider
  Carousel.al-slider__list(v-bind="config")
    Slide.al-slider__item(v-for="slide in slides" :key="slide.id")
      component(:is="SlideKind" v-bind="{...slide, ...slide.meta}")
    template(#addons)
      Navigation
      Pagination
</template>

<style lang="scss">
.al-slider{
  .carousel{
    &__prev, &__next{
      background-color: $color-white;
      border: 1px solid $color-black;
      border-radius: 50%;
      color: $color-black;
      font-size: pxToRem(20);
      height: pxToRem(40);
      line-height: pxToRem(40);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: pxToRem(40);
      z-index: 1;
    }
  }
}
</style>
