<script setup lang="ts">
import { breakpointMediaLg, breakpointMediaMd, breakpointMediaSm, breakpointMediaXs,  } from '~/assets/ts/tokens';
const props = defineProps<{
  name: string
}>()

const breakpoints: any = {
  xs: {
    min: breakpointMediaXs,
    max: 743
  },
  sm: {
    min: breakpointMediaSm,
    max: 1023
  },
  md: {
    min: breakpointMediaMd,
    max: 1365
  },
  lg: {
    min: breakpointMediaLg,
    max: 1535
  },
  xl: {
    min: breakpointMediaLg,
    max: Infinity
  }
}

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

const withNavigation = computed(() => {
  if('breakpoints' in config){
    const sw = Object.keys(config.breakpoints).find((breakPoint: string) => window.matchMedia(breakpoints[breakPoint].min).matches && config.breakpoints[breakPoint].navigationEnabled)
    return sw
  }
  return config.navigationEnabled
})

const withPagination = computed(() => {
  if('breakpoints' in config){
    const sw = Object.keys(config.breakpoints).find((breakPoint: string) => window.matchMedia(breakpoints[breakPoint].min).matches && config.breakpoints[breakPoint].pagination)
    if(sw){
      return sw
    }
  }
  return config.pagination
})
</script>

<template lang="pug">
.al-slider
  Carousel.al-slider__list(v-bind="config")
    Slide.al-slider__item(v-for="slide in slides" :key="slide.id")
      component(:is="SlideKind" v-bind="{...slide, ...slide.meta}")
        ContentRenderer(:value="slide")
    template(#addons)
      ClientOnly
        Navigation(v-if="withNavigation")
        Pagination(v-if="withPagination")
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
