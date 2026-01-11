<script setup lang="ts">
defineProps<{
  withPadding?: boolean
}>()
</script>

<template lang="pug">
.container(:class="{ 'with-padding': withPadding }")
  slot
</template>

<style scoped lang="scss">
.container{
  width: 100%;
  margin: 0 auto;
  padding-right: pxToRem(20);
  padding-left: pxToRem(20);

  &.with-padding{
    padding-top: pxToRem(20);
    padding-bottom: pxToRem(20);
  }
  
  @media #{$breakpoint-media-sm}{
    max-width: pxToRem(664);
    padding-left: 0;
    padding-right: 0;
    &.with-padding{
      padding-top: pxToRem(40);
      padding-bottom: pxToRem(40);
    }
  }
  
  @media #{$breakpoint-media-md}{
    max-width: pxToRem(980);
    &.with-padding{
      padding-top: pxToRem(50);
      padding-bottom: pxToRem(50);
    }
  }
  
  @media #{$breakpoint-media-lg}{
    max-width: pxToRem(1100);
  }

  @media #{$breakpoint-media-xl}{
    max-width: pxToRem(1420);
  }


}
</style>
