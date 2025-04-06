<script setup lang="ts">
defineProps<{
  items: [],
  variant?: string,
  alignment?: string,
  background?: string
}>()
</script>

<template lang="pug">
ul.list(:class="`variant-${variant} alignment-${alignment}`" :style="`--bg-color: ${background}`")
  li.list__item(v-for="item in items" :key="item.id") 
      AlIcon(:name="item.icon")
      .list__item__content
        p.list__item__title {{ item.title }}
        p.list__item__description {{ item.description }}
</template>

<style scoped lang="scss">
.list{
  list-style: none;
  padding: 0;
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);

  @media #{$breakpoint-media-sm}{
    gap: pxToRem(40);
  }

  &__item{
    width: 100%;
    display: flex;
    gap: pxToRem(20);
    align-items: center;
    background-color: var(--bg-color, $color-gray-100);
    border-radius: pxToRem(16);
    padding: pxToRem(20);

    &__content{
      display: flex;
      width: 100%;
    }

    .al-icon{
      flex-shrink: 0;
      width: pxToRem(100);
      height: pxToRem(100);
      padding: pxToRem(10);
      background: linear-gradient(135deg, $color-black 0%, $color-gray-700 100%);
      color: $color-white;
      border-radius: pxToRem(99);
    }

    &__title{
      font-size: pxToRem(20);
      font-weight: bold;
      color: $color-primary-red;
    }

    &__description{
      color: $color-gray-800;
    }
  }

  &.variant{
    &-b{
      .list{
        &__item{
          flex-direction: row-reverse;
          &__content{
            flex-direction: column;
            gap: pxToRem(10);
          }

          .al-icon{
            background: none;
            color: $color-primary-red;
          }
        }
      }
    }
  }

  &.alignment{
    &-center{
      text-align: center;
      align-items: center;
    }
    &-right{
      text-align: right;
      align-items: flex-end;
    }
  }
}
</style>
