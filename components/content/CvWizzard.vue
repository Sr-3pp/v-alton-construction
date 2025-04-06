<script setup lang="ts">
const { $csrfToken } = useNuxtApp()

const formEl = ref<HTMLFormElement | null>(null)

const cvHandler = async () => {
  formEl.value?.reportValidity()

  const data = new FormData()
  data.append('attachments', resumeForm.value.resume as File)
  data.append('name', resumeForm.value.name)
  data.append('email', resumeForm.value.email)
  data.append('subject', 'Job Application')
  data.append('message', `Job application from ${resumeForm.value.name}`)
  data.append('csrfToken', $csrfToken as string)

  await $fetch('/api/send-mail', {
    method: 'POST',
    body: data,
    headers: {
      'X-CSRF-Token': $csrfToken as string
    }
  })
  sent.value = true
  resumeForm.value = {
    resume: null,
    name: '',
    email: ''
  }
  cvModal.value!.toggle()
}

const cvModal = ref<{ toggle: () => void } | null>(null)
const sending = ref(false)
const sent = ref(false)

const resumeForm = ref<{
  resume: File | null,
  name: string,
  email: string
}>({
  resume: null,
  name: '',
  email: ''
})
</script>

<template lang="pug">
.cv-wizzard
  AlIcon(name="burger-menu")
  TransitionGroup(name="fade")
    template(v-if="!sent")
      .cv-wizzard__content
        h3 CV Wizzard
        p This is the CV Wizzard component
      AlButton(@click="cvModal.toggle()" :disabled="sending" :loading="sending" label="Submit CV")
    template(v-else)
      .cv-wizzard__content
        h3 CV Submitted
        p Your CV has been submitted

Modal(ref="cvModal")
  template(#body)
    form.cv-wizzard__form(ref="formEl" @submit.prevent="cvHandler")
      fieldset
        label.cv-wizzard__form__input
          input(
            type="file" 
            accept="pdf"
            required
            placeholder="First Name"
            @change="resumeForm.resume = $event.target.files[0]"
          )
          span.cv-wizzard__form__input__label Resume
        label.cv-wizzard__form__input
          input(
            type="text"
            required
            placeholder="Full Name"
            v-model="resumeForm.name"
          )
          span.cv-wizzard__form__input__label full name
        label.cv-wizzard__form__input
          input(
            type="email"
            required
            placeholder="Email"
            v-model="resumeForm.email"
          )
          span.cv-wizzard__form__input__label email
    AlButton(label="Submit CV")
</template>

<style scoped lang="scss">
.cv-wizzard{
  background: linear-gradient(to right, $color-black 0%, $color-gray-700 100%);
  color: $color-white;
  display: flex;
  align-items: center;
  gap: pxToRem(20);
  padding: pxToRem(20);
  border-radius: pxToRem(16);

  &__content{
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    width: 100%;

    >*{
      color: currentColor;
    }
  }

  &__form{
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);

    fieldset{
      display: flex;
      flex-direction: column;
      gap: pxToRem(10);
    }


    &__input{
      display: flex;
      flex-direction: column;
      gap: pxToRem(5);
      position: relative;

      input{
        padding: pxToRem(10);
        border-radius: pxToRem(8);
        color: $color-gray-400;
        font-size: pxToRem(12);
        border: {
          color: $color-gray-800;
          width: pxToRem(1);
          style: solid;
        }
        transition: all 0.3s;
        &[type="file"]{
          opacity: 0;
          position: absolute;
          width: 0;
          height: 0;
        }
      }

      &__label{
        background: $color-gray-800;
        border-radius: pxToRem(8);
        padding-left: pxToRem(10);
        padding-right: pxToRem(10);
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-50%);
        color: $color-gray-400;
        font-size: pxToRem(10);
        transition: all 0.3s;
      }
    }
  }

  .al-icon{
    width: pxToRem(100);
    height: pxToRem(100);
  }

  .al-button{
    width: pxToRem(200);
  }
}
</style>
