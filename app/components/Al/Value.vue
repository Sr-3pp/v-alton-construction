<script setup lang="ts">
defineProps<{
  icon: string
}>();
</script>

<template lang="pug">
article.al-value-card
  AlIcon(:name="icon")
  .al-value-card__content
    h3.al-value-card__title
      slot
    p.al-value-card__description
      slot(name="description")
</template>

<style scoped lang="scss">
.al-value-card{
  display: flex;
  align-items: center;
  gap: pxToRem(20);
  padding: pxToRem(20);
  border-radius: pxToRem(8);
  background-color: $color-gray-100;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  .al-value-card__content{
    flex-grow: 1;
    .al-value-card__title{
      font-size: pxToRem(24);
      font-weight: 700;
      margin: 0;
    }
    .al-value-card__description{
      font-size: pxToRem(16);
      margin: 0;
    }
  }
}
</style>
