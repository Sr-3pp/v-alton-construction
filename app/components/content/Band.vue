<script setup lang="ts">
defineProps<{
  alignment?: string,
  withPadding?: boolean
}>();
</script>

<template lang="pug">
section.band(:class="alignment ? `alignment-${alignment}` : ''")
  Container(:with-padding="withPadding")
    slot
</template>

<style scoped lang="scss">
.band{
  background-color: $color-primary-red;
  color: $color-white;
  padding: pxToRem(10);
  font-weight: normal;

  &.alignment-left{
    .container{
      text-align: left;
      display: flex;
      justify-content: flex-start;
    }
  }

  &.alignment-center{
    .container{
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }

  &.alignment-right{
    .container{
      text-align: right;
      display: flex;
      justify-content: flex-end;
    }
  }

  .container{
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);

    > *{
      color: currentColor;
    }
  }
}
</style>
