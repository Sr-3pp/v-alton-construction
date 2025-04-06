<script setup lang="ts">
defineProps<{
  items: [],
  sizes: {
    xs: string,
    sm: string,
  },
  variant?: string,
  withPadding?: boolean
}>();
</script>

<template lang="pug">
Container(:with-padding="withPadding")
  AlGrid.icon-grid(:class="`variant-${variant}`")
    AlGridCol.icon-grid__item(
      v-for="item in items"
      :key="item.id"
      :size="sizes.xs" :size-sm="sizes.sm"
    )
      AlIcon(:name="item.icon")
      .icon-grid__content
        h3.icon-grid__title {{ item.title }}
        p.icon-grid__description(v-if="item.description") {{ item.description }}
</template>

<style scoped lang="scss">
.icon-grid{
  justify-content: center;

  &__item{
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: pxToRem(10);

    .al-icon{
      background-color: $color-primary-red;
      border-radius: pxToRem(16);
      padding: pxToRem(4);
      color: $color-white;
      width: pxToRem(60);
      height: pxToRem(60);
      flex-shrink: 0;
      margin-bottom: auto;
    }
  }

  &.variant{
    &-b{
      .icon-grid__item{
        .al-icon{
          background-color: $color-primary-blue;
        }
      }
    }
    &-c{
      .icon-grid__item{
        flex-direction: column;
        align-items: center;
        text-align: center;
        .al-icon{
          width: pxToRem(100);
          height: pxToRem(100);
          border-radius: pxToRem(99);
          background-color: $color-gray-800;
          color: $color-white;
          padding: pxToRem(20);
        }
      }

      .icon-grid__title{
        font-size: pxToRem(24);
        color: $color-primary-red;
      }
    }
  }
}
</style>
