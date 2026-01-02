<script setup lang="ts"></script>

<template lang="pug">
.paragraph
  slot
</template>

<style scoped lang="scss">
.paragraph{
  font-size: pxToRem(16);
  color: $color-gray-800;

  display: flex;
  flex-direction: column;
  gap: pxToRem(10);
}
</style>
