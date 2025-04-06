<script setup lang="ts"></script>

<template lang="pug">
.al-loader
  .al-loader__spinner
</template>

<style scoped lang="scss">
.al-loader{
  --spinner-width: #{pxToRem(8)};
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color-gray-900, .8);
  z-index: 1000;
}
.al-loader__spinner{
  width: 50%;
  max-width: pxToRem(100);
  aspect-ratio: 1;
  border-radius: 50%;
  border: var(--spinner-width) solid $color-primary-red;
  border-top-color: $color-primary-blue;
  animation: spin 1s linear infinite;
}
@keyframes spin{
  to{
    transform: rotate(360deg);
  }
}
</style>
