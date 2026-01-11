<script setup lang="ts">
defineProps({
  submenu: Array
})
</script>

<template lang="pug">
.al-submenu
  ul.al-submenu__menu
    li.al-submenu__item(v-for="(item, i) in submenu" :key="item.id")
      NuxtLink(:to="item.path.replace('/pages', '')") {{ item.title }}
</template>

<style scoped lang="scss">
.al-submenu{
  width: 100%;
  flex-shrink: 0;

  &__menu{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: pxToRem(4);
  }

  &__item{
    padding: pxToRem(10);
    background: linear-gradient(90deg, $color-gray-900 0%, $color-gray-600 100%);
    color: $color-text-light;
    font-size: pxToRem(14);
    font-weight: bold;

    a{
      display: flex;
      color: currentColor;
      transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
      &.router-link-exact-active{
        color: $color-primary-yellow;
        transform: translateX(pxToRem(10));
      }
    }

    &:hover{
      a{
        color: $color-primary-yellow;
      }
    }
  }
}
</style>
