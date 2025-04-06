<script setup lang="ts">
const { $csrfToken } = useNuxtApp();

const formEl = ref<HTMLFormElement | null>(null)
const sending = ref(false)
const sent = ref(false)

const contactForm = ref<{
  name: string,
  email: string,
  message: string
}>({
  name: '',
  email: '',
  message: ''
})

const submitHandler = async () => {
  formEl.value?.reportValidity()
  
  sending.value = true
  
  const formData = new FormData()
  formData.append('name', contactForm.value.name)
  formData.append('email', contactForm.value.email)
  formData.append('message', contactForm.value.message)
  formData.append('subject', 'Contact Form')
  formData.append('csrfToken', $csrfToken as string)
  
  await $fetch('/api/send-mail', {
    method: 'POST',
    body: formData,
    headers: {
      'X-CSRF-Token': $csrfToken as string
    }
  })

  sending.value = false
  sent.value = true
}
</script>

<template lang="pug">
.al-contact
  TransitionGroup(name="fade")
    template(v-if="!sent")
      form.al-contact__form(@submit.prevent="submitHandler" ref="formEl")
        input(type="text" required v-model="contactForm.name" placeholder="Name")
        input(type="email" required v-model="contactForm.email" placeholder="Email")
        textarea(placeholder="Message" required v-model="contactForm.message")
        AlButton(label="Send" :disabled="sending" :loading="sending")
    template(v-else)
      h3 Contact Form Submitted
      p Your message has been sent
</template>

<style scoped lang="scss">
.al-contact{
  &__form{
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);
    input, textarea{
      padding: pxToRem(16);
      border: none;
      border-radius: pxToRem(8);
      background-color: $color-gray-200;
    }

    .al-button{
      margin-right: auto;
    }
  }
}
</style>
