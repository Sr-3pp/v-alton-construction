<script setup lang="ts">

const { data: page } = await useAsyncData(() => queryCollection('content').path('/pages/contact').first())
useSeoMeta({
  title: page.value?.seo.title,
  description: page.value?.seo.description
})

const { data: contact } = await useAsyncData('contact', () => queryCollection('config').path('/config/contact').first())

const contactData = contact.value?.body

const map = ref(null)

const mapAttribution = '&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors'

</script>

<template lang="pug">
Banner(banner="https://picsum.photos/1100/300")

Container(:with-padding="true")
  AlGrid
    AlGridCol(size="1" size-sm="1/2").content
      ContentRenderer.content__doc(v-if="page" :value="page")
      div(v-else) Loading...

      AlContact
    AlGridCol.content__data(size="1" size-sm="1/2")
      h2 Find us

      ul.content__data__list
        li.content__data__item
          AlIcon(name="burger-menu")
          .content__data__item__info
            h3 Address
            p {{ contactData.address }}
        li.content__data__item
          AlIcon(name="burger-menu")
          .content__data__item__info
            h3 Email
            ol
              li(v-for="email in contactData.emails") {{ email }}
        li.content__data__item
          AlIcon(name="burger-menu")
          .content__data__item__info
            h3 Phone
            ol
              li(v-for="phone in contactData.tels") {{ phone }}
        li.content__data__item
          AlIcon(name="burger-menu")
          .content__data__item__info
            h3 Social
            ol
              li(v-for="social in contactData.social")
                a(:href="social.url" target="_blank") {{ social.name }}
section.map
  LMap.map__element(
    ref="map"
    :zoom="8"
    :center="contactData.map.center"
    :use-global-leaflet="false"
  )
    LTileLayer(
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :attribution="mapAttribution"
      layer-type="base"
      name="OpenStreetMap"
    )
    LMarker(:lat-lng="contactData.map.marker")
  Container.map__container
    .map__content
      div
        h4.map__content__title  Address
        p.map__content__description {{ contactData.address }}
      div
        h4.map__content__title Opening hours
        ul.map__content__hours
          li.map__content__hour(v-for="hour in contactData.hours")
            span {{ hour.day }}
            span {{ hour.hours }}

</template>

<style scoped lang="scss">
.content, .content__doc{
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);

  @media #{$breakpoint-media-sm}{
    gap: pxToRem(40);
  }
}

.content{
  &__data{
    display: flex;
    flex-direction: column;
    gap: pxToRem(20);

    border-bottom: {
      width: pxToRem(1);
      style: solid;
      color: $color-gray-200;
    };

    @media #{$breakpoint-media-sm}{
      padding-left: pxToRem(40);
      border-bottom: none;
      border-left: {
        width: pxToRem(1);
        style: solid;
        color: $color-gray-200;
      };
    }

    &__list{
      list-style: none;
      padding: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: pxToRem(20);
    }

    &__item{
      width: 100%;
      display: flex;
      gap: pxToRem(20);
      align-items: center;

      .al-icon{
          color: $color-gray-800;
          width: pxToRem(60);
          height: pxToRem(60);
          flex-shrink: 0;
        }

      &__info{
        display: flex;
        flex-direction: column;
        gap: pxToRem(10);

        ol{
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: pxToRem(10);

          li{
            font-size: pxToRem(16);
          }
        }
      }
    }
  }
}

.map{
  position: relative;
  &__element{
    background-color: $color-gray-200;
    padding: pxToRem(20);
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__container{
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: pxToRem(20);
    min-height: 70dvh;
  }

  &__content{
    padding: pxToRem(20);
    background-color: $color-primary-red;
    color: $color-white;
    border-bottom-right-radius: pxToRem(20);
    border-bottom-left-radius: pxToRem(20);
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    gap: pxToRem(20);

    @media #{$breakpoint-media-sm}{
      padding: pxToRem(40);
      gap: pxToRem(40);
    }

    &__title{
      color: $color-white;
      font-size: pxToRem(24);
      font-weight: bold;
      margin-bottom: pxToRem(10);
    }

    &__description{
      font-size: pxToRem(16);
    }

    &__hours{
      margin-top: pxToRem(20);
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: pxToRem(10);

      li{
        display: flex;
        justify-content: space-between;
        font-size: pxToRem(16);
      }
    }

    &__hour{
      display: flex;
      justify-content: space-between;
      gap: pxToRem(30);
    }

  }
}
</style>
