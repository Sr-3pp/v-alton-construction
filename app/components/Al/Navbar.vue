<script setup lang="ts">
const navigation = inject('navigation') as Ref<any>

const navOrder = ['home', 'services', 'projects', 'about', 'contact']

const isActive = ref(false)
const subActive = ref(-1)

const nav = computed(() => {
  return navOrder.map((key) => {
    return navigation.value!.find((item: {title: string}) => item.title.toLowerCase().includes(key))
  })
})

const toggle = () => isActive.value = !isActive.value

const navMenu = ref<HTMLElement | null>(null)

onMounted(() => {
  const elements = navMenu.value!.querySelectorAll('.al-navbar__nav__menu__item:not(.close)') as NodeListOf<HTMLElement>
  elements.forEach((el) => {
    if(el.children.length > 1){
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--submenu-width', `${window.innerWidth - rect.left}px`)
    }
  })
})

defineExpose({
  toggle
})

watch(isActive, (val) => {
  if(!val){
    subActive.value = -1
  }
})
</script>

<template lang="pug">
header.al-navbar
  Container
    nav.al-navbar__nav
      figure.al-navbar__nav__logo
        AlLogo
      button.al-navbar__nav__burger(@click="toggle")
        AlIcon(name="burger-menu")
      ul.al-navbar__nav__menu(:class="{active: isActive}" ref="navMenu")
        li.al-navbar__nav__menu__item.close
          button(@click="toggle") ✕
        li.al-navbar__nav__menu__item(
            v-for="(item, i) in nav"
            :key="item.id"
            :class="{active: subActive == i}"
        )
          span.al-navbar__nav__menu__item__label
            NuxtLink.al-navbar__nav__menu__link(:to="item.path.replace('/pages', '') || '/'") {{ item.title }}
            button.al-navbar__nav__menu__item__chevron(v-if="item.children" @click="subActive != i ? subActive = i : subActive = -1" :class="{active: subActive == i}")
              AlIcon(name="chevron-down")
          ol.al-navbar__nav__submenu(v-if="item.children")
            template(v-for="(subItem, j) in item.children")
              li.al-navbar__nav__submenu__item(v-if="j != 0" :key="subItem.id")
                NuxtLink.al-navbar__nav__submenu__link(:to="subItem.path.replace('/pages', '') || '/'") {{ subItem.title }}
  div.al-navbar__backdrop(:class="{active: isActive}" @click="toggle")
</template>

<style scoped lang="scss">
.al-navbar{
  background-color: $color-primary-blue;
  color: $color-text-light;
  display: flex;
  justify-content: space-between;
  position: sticky;
  z-index: 999;
  top: 0;

  @media #{$breakpoint-media-sm}{
    background-color: transparent;
    background: linear-gradient(90deg, $color-primary-blue 50%, $color-primary-blue 50%);
  }

  &__nav{
    --nav-height: #{pxToRem(80)};
    padding-left: pxToRem(20);
    padding-right: pxToRem(20);
    display: flex;
    justify-content: space-between;
    gap: pxToRem(20);
    
    @media #{$breakpoint-media-sm}{
      padding: 0;
    }

    &__logo{
      fill: $color-white;
      width: pxToRem(200);
      margin: auto;
    }

    &__menu{
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: pxToRem(20);
      list-style: none;
      position: fixed;
      top: 0;
      right: -100%;
      background-color: $color-primary-blue;
      width: 50%;
      min-width: pxToRem(400);
      height: 100dvh;
      padding: pxToRem(20);
      padding-top: pxToRem(80);
      margin: 0;
      border-top-left-radius: pxToRem(20);
      transition: right .35s ease-in-out;

      @media #{$breakpoint-media-sm}{
        padding-bottom: 0;
        padding-top: 0;
        border-top-left-radius: 0;
        position: relative;
        right: inherit;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        background-color: transparent;
        width: auto;
        height: auto;
        background-color: $color-primary-blue;
      }


      &__item{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: pxToRem(10);
        font-size: pxToRem(20);
        font-weight: bold;
        font-family: 'Calibri';
        position: relative;
        background-color: $color-primary-red;
        border-radius: pxToRem(16);
        transition: color .35s ease-in-out;

        &.active{
          .al-navbar__nav__submenu{
            max-height: 100dvh;
          }
        }

        &:has(.router-link-exact-active) .al-navbar__nav__menu__link{
          color: $color-primary-yellow;
        }

        @media #{$breakpoint-media-sm}{
          padding: 0;
          background-color: transparent;
          button{
            display: none;
          }

          &:hover{
            color: $color-primary-yellow;
            .al-navbar__nav__submenu{
              transform: translateX(0);
            }
          }
        }
        

        &.close{
          --size: #{pxToRem(20)};
          --color: #{$color-primary-red};
          position: absolute;
          left: 0;
          top: 0;
          width: auto;
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          button{
            padding: pxToRem(10);
            padding-right: pxToRem(20);
            padding-left: pxToRem(20);
            background-color: $color-primary-red;
            color: $color-white;
            border: none;
            border-top-left-radius: pxToRem(20);
            border-bottom-right-radius: pxToRem(10);
            font-size: pxToRem(30);
          }

          @media #{$breakpoint-media-sm}{
            display: none;
          }

          &::before{
            @include invertedRadius(rotate(270deg));
            top: 100%;
            left: 0;
          }
          
          &::after{
            @include invertedRadius(rotate(270deg));
            top: 0;
            left: 100%;
          }
        }

        &__label{
          display: flex;
          width: 100%;
          gap: pxToRem(10);
        }

        &__chevron{
          display: flex;
          margin-left: auto;
          border: none;
          background: none;
          color: $color-white;
          width: pxToRem(40);
          height: pxToRem(40); 
          transform: rotate(180deg);
          transition: transform 0.3s ease-in-out;

          &.active{
            transform: rotate(0);
          }
        }
      }

      &__link{
        color: currentColor;
        text-decoration: none;
        width: 100%;
        height: var(--nav-height);
        display: flex;
        align-items: center;

        &.router-link-exact-active{
          color: $color-primary-yellow;
        }

        @media #{$breakpoint-media-sm}{
          padding-left: pxToRem(10);
          padding-right: pxToRem(10);
        }
      }

      &.active{
        right: 0;
      }
    }

    &__submenu{
      width: 100%;
      overflow: hidden;
      list-style: none;
      max-height: 0;
      margin: 0;
      overflow: auto;
      padding-left: pxToRem(20);
      transition: transform 0.3s ease-in-out, max-height 0.3s ease-in-out;
      &__item{
        font-weight: normal;
        padding: pxToRem(10);
      }

      &__link{
        color: $color-white;
        text-decoration: none;
        padding: pxToRem(10);
        display: block;

        &.router-link-exact-active{
          border: {
            style: solid;
            width: pxToRem(2);
            color: $color-white;
            radius: pxToRem(8);
          }
        }

        @media #{$breakpoint-media-sm}{
          &:hover{
            color: $color-primary-yellow;
          }
        }
      }      

      @media #{$breakpoint-media-sm}{
        background-color: $color-primary-blue;
        height: calc(100dvh - var(--nav-height));
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 2;
        width: var(--submenu-width, 50vw);
        padding: 0;
        max-height: inherit;
        transform: translateX(100%);
      }
    }

    &__burger{
      background-color: transparent;
      border: none;
      color: $color-white;
      padding: 0;

      .al-icon{
        width: pxToRem(50);
        height: pxToRem(50);
      }

      @media #{$breakpoint-media-sm}{
        display: none;
      }
    }
  }

  &__backdrop{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-black, .5);
    z-index: -1;
    backdrop-filter: blur(pxToRem(4));
    transition: opacity 0.3s ease-in-out;

    &.active{
      display: block;
    }

    @media #{$breakpoint-media-sm}{
      display: none!important;
    }
  }
}
</style>
