<script setup lang="ts">
const route = useRoute()
const { navigation, getSubmenu } = useNavigation()
const { data: nav } = await navigation

const project = route.params.project as string

const { data: main } = await useAsyncData(`project-main-${route.path}`, () => queryCollection('content').path(`/pages${route.path}`).first(), {
  watch: [() => route.path]
})
const { data: extra } = await useAsyncData(`project-extra-${route.path}`, () => queryCollection('content').path(`/pages${route.path}/extra`).first(), {
  watch: [() => route.path]
})

const gallery = computed(() => getSubmenu(`${route.path.substring(1)}/items`, nav.value as []))

useSeoMeta({
  title: main.value?.seo.title,
  description: main.value?.seo.description,
})

definePageMeta({
  layout: false
})

const projectModal = ref()
const currentProject = ref()

const projectDetail = async (path: string) => {
  currentProject.value = await queryCollection('content').path(path).first()
  projectModal.value!.toggle()
}
</script>

<template lang="pug">
  NuxtLayout(name="submenu")
    template(#main) 
      ContentRenderer.content(v-if="main" :value="main")
      AlGrid.gallery
        AlGridCol.gallery__item(v-for="item in gallery"
          :key="item.path"
          size="1"
          size-sm="1/3"
          :grow="false"
        )
          button(@click="projectDetail(item.path)")
            NuxtImg(:src="`${item.meta.image}`" :alt="item.title")
            div.gallery__item__overlay
              h3 {{ item.title }}
              small {{ main.title }}
              AlIcon(name="burger-menu")
    template(#extra)
      Container.extra(:with-padding="true")
        ContentRenderer(v-if="extra" :value="extra")
      Modal(ref="projectModal")
        template(#body v-if="currentProject")
          .project-detail(:class="`layout-${currentProject.meta.layout}`")
            NuxtImg(:src="`${currentProject.meta.image}`" :alt="project")
            .project-detail__content
              ContentRenderer.renderer(:value="currentProject")
              p Client: {{ currentProject.meta.client }}
              p Project: {{ currentProject.meta.project }}
</template>

<style scoped lang="scss">
.content, .extra{
  display: flex;
  flex-direction: column;
  gap: pxToRem(20);
}

.extra{
  padding-top: 0!important;
}

.gallery{
  &__item{
    position: relative;
    button{
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: pxToRem(20);
      padding: 0;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__overlay{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: pxToRem(10);
      background-color: $color-primary-red;
      color: $color-white;
      text-align: left;
      padding: pxToRem(20);
      border-radius: pxToRem(20);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;

      .al-icon{
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        width: pxToRem(30);
        height: pxToRem(30);
        margin-top: auto;
        margin-left: auto;
      }

      > * {
        color: currentColor
      }

      h3{
        margin-top: auto;
      }
    }

    &:hover{
      .gallery__item__overlay{
        opacity: 1;
      }
    }
  }
}

.project-detail{
  display: flex;
  gap: pxToRem(20);

  &.layout{
    &-row{
      flex-direction: row;
    }

    &-column{
      flex-direction: column;
    }
  }

  &__content{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: pxToRem(20);

    .renderer{
      margin-bottom: auto;
    }
  }
}
</style>
