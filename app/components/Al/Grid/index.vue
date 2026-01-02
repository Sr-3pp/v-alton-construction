<script setup lang="ts"></script>

<template lang="pug">
div.al-grid
  slot
</template>

<style scoped lang="scss">
.al-grid{
  --gap: #{pxToRem(20)};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: var(--gap);
}
</style>
