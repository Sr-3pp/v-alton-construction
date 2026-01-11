<script setup lang="ts">
defineProps<{
  banner: string
}>()

const route = useRoute();
const breadCrumb = computed(() => {
  const paths = route.path.split('/').filter(Boolean);
  return paths.map((path, index) => ({
    text: path,
    to: '/' + paths.slice(0, index + 1).join('/')
  }))
})

</script>

<template lang="pug">
.banner
  figure.banner__image
    NuxtImg(:src="banner" v-if="banner" alt="Banner Image")
  Container
    ul.banner__breadcrumb
      li.banner__breadcrumb__item(v-for="(item, i) in breadCrumb" :key="item.to")
        NuxtLink.banner__breadcrumb__link(:to="item.to" :disabled="i == 0")
          h2 {{ item.text.replace(/_/g, ' ') }}
</template>

<style scoped lang="scss">
.banner{
  position: relative;
  display: flex;
  height: pxToRem(250);
  align-items: center;
  justify-content: center;
  color: $color-white;
  overflow: hidden;

  .container{
    padding-right: pxToRem(20);
    padding-left: pxToRem(20);

    @media #{$breakpoint-media-sm}{
      padding-right: 0;
      padding-left: 0;
    }
  }

  &__image{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    margin: 0;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__breadcrumb{
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: pxToRem(14);
    font-weight: 500;
    text-transform: uppercase;
    &__item{
      &:not(:last-child){
        &::after{
          content: '/';
          margin: pxToRem(8);
        }
      }
    }
    &__link{
      color: $color-white;
      text-decoration: none;
      text-shadow: rgba($color-text-dark, .5) 0px 0px pxToRem(8);
      display: inline-block;
      > *{
        color: currentColor;
      }
    }
  }
}
</style>
