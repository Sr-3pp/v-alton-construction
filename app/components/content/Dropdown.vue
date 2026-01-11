<script setup lang="ts">
const isActive = ref(false)
</script>

<template lang="pug">
.dropdown
  button.dropdown__button(@click="isActive = !isActive")
    slot
    span.dropdown__button__icon(:class="{active: isActive}") ▼
  Transition(name="dropdown-transition")
    div.dropdown__content(v-if="isActive")
      slot(name="content")
</template>

<style scoped lang="scss">
.dropdown{
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: pxToRem(8);
  background-color: $color-gray-800;
  color: $color-gray-300;
  
  &__button{
    color: currentColor;
    font-weight: bold;
    font-size: pxToRem(20);
    padding: pxToRem(10);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: pxToRem(10);

    &__icon{
      color: $color-primary-yellow;
      display: inline-block;
      margin-left: pxToRem(10);
      transition: transform .35s ease-in-out;
      
      &.active{
        transform: rotate(180deg);
      }
    }
  }

  &__content{
    padding: pxToRem(10);
    overflow: hidden;
    border-top: {
      width: pxToRem(1);
      style: solid;
      color: $color-gray-700;
    };
    transition: opacity .35s ease-in-out, max-height .35s ease-in-out;
  }

  &-transition{
      &-enter-active, &-leave-active{
        opacity: 1;
        max-height: 100vh;
      }
  
      &-enter-from, &-leave-to{
        opacity: 0;
        max-height: 0;
      }
    }
}
</style>
