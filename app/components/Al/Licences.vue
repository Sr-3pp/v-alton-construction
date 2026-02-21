<script setup lang="ts">
type Licence = {
  id?: string
  name: string
  url: string
}

withDefaults(defineProps<{
  licences?: Licence[]
}>(), {
  licences: () => []
})
</script>

<template lang="pug">
.al-licences
  h4 Licences
  ul.al-licences__list
    li.al-licences__item(v-for="(licence, i) in licences" :key="licence.id || `${licence.name}-${i}`") 
      a.al-licences__licence(:href="licence.url" target="_blank")
        NuxtImg.al-icon(src="/svg/PDF.svg" :alt="licence.name")
        p {{ licence.name }}
</template>

<style scoped lang="scss">
.al-licences{
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);
  border-top: solid thin $color-primary-red;
  border-bottom: solid thin $color-primary-red;
  padding-top: pxToRem(20);
  padding-bottom: pxToRem(20);
  
  &__list{
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
  }

  &__item{
    display: flex;
    gap: pxToRem(10);
    align-items: center;

    .al-icon{
      width: pxToRem(40);
      height: pxToRem(40);
    }
  }

  &__licence{
    display: flex;
    gap: pxToRem(10);
    align-items: center;
  }
}
</style>
