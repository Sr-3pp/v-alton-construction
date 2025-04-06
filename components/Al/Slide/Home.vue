<script setup lang="ts">
const props = defineProps<{
  title: string,
  description: string,
  cta?: {
    label: string,
    href: string
  },
  sources: {
    xs: string,
    sm?: string,
    md?: string,
  },
  config: {
    alignment: string
  }
}>()
</script>

<template lang="pug">
.al-slide__home(:class="`variant-${config.alignment}`")
  picture.al-slide__home__picture
    source(v-if="sources.sm" media="(max-width: 767px)" :srcset="sources.sm")
    source(v-if="sources.md" media="(max-width: 1023px)" :srcset="sources.md")
    img(:src="sources.xs" :alt="title")
  div.al-slide__home__content
    Container.al-slide__home__container
      h2.al-slide__home__title {{ title }}
      p.al-slide__home__description {{ description }}
      AlButton(v-if="cta" :href="cta.href" :label="cta.label")
</template>

<style scoped lang="scss">
.al-slide__home{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 70dvh;

  &__content{
    display: flex;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    background: linear-gradient(var(--grad-dir), rgba($color-white, 0) 0%, $color-gray-900 100%);
  }

  &.variant{
    &-right{
      .al-slide__home__content{
        --grad-dir: to right;
      }
      .al-slide__home__container{
        text-align: right;
        align-items: flex-end;
      }
    }
    &-center{
      .al-slide__home__content{
        background: none;
      }
      .al-slide__home__container{
        text-align: center;
        align-items: center;
        background: linear-gradient(to left, $color-gray-900 0%, $color-text-dark 50%, $color-gray-900 100%);
      }
    }
    &-left{
      .al-slide__home__content{
        --grad-dir: to left;
      }
      .al-slide__home__container{
        text-align: left;
        align-items: flex-start;
      }
    }
  }

  &__title{
    font-family: "Calibri";
    color: currentColor;
  }

  &__title, &__description{
    margin: 0;
  }

  &__picture{
    width: 100%;
    max-width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    z-index: -1;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__container{
    display: flex;
    flex-direction: column;
    gap: pxToRem(20);
    padding: pxToRem(20);
    color: $color-text-light;
    border-radius: pxToRem(8);
    margin: auto;
    z-index: 1;

    h2{
      font-size: pxToRem(32);
    }

    p{
      font-size: pxToRem(16);
    }
  }
}
</style>
