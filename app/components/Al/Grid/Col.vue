<script setup lang="ts">
const props = defineProps<{
  size: string | number,
  sizeSm?: string | number,
  sizeMd?: string | number,
  sizeLg?: string | number,
  sizeXl?: string | number,
  grow?: boolean
}>()

const colSizes = computed(() => {
  const sizes: any = {}

  Object.entries(props).forEach(([key, value]: any) => {
    if(key.includes('size') && value){
      const br = key.replace('size', '').toLowerCase()
      sizes[`--col-width${br ? `-${br}` : ''}`] = typeof value == 'string' ? 
        value.includes('/')
        ?
        value.split('/').reduce((acc: string, val: string) => {
          return 100 *(Number(acc) / Number(val)) + '%'
        })
        : '100%' 
      : '100%'
    }
  })

  return sizes
})
</script>

<template lang="pug">
.al-grid-col(:style="{...colSizes, flexGrow: props.grow ? 1 : 0}")
  slot
</template>

<style scoped lang="scss">
.al-grid-col{
  --col-width-current: var(--col-width);
  display: flex;
  flex-direction: column;
  flex-basis: calc(var(--col-width-current) - var(--gap));
  flex-shrink: 1;
  flex-grow: 1;

  @media #{$breakpoint-media-sm}{
    --col-width-current: var(--col-width-sm, var(--col-width));
  }

  @media #{$breakpoint-media-md}{
    --col-width-current: var(--col-width-md, var(--col-width-sm, var(--col-width)));
  }

  @media #{$breakpoint-media-lg}{
    --col-width-current: var(--col-width-lg, var(--col-width-md, var(--col-width-sm, var(--col-width))));
  }

  @media #{$breakpoint-media-xl}{
    --col-width-current: var(--col-width-xl, var(--col-width-lg, var(--col-width-md, var(--col-width-sm, var(--col-width)))));
  }
}

</style>
