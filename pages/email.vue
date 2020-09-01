<template>
  <form @submit.prevent="sendEmail" class="contact-form">
    <label>Name</label>
    <input type="text" name="from_name">
    <label>destinatario</label>
    <input type="text" name="to_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message" />
    <input type="submit" value="Send">
  </form>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('service_m53m1n5', 'template_lddu8aq', e.target, 'user_9qIFArLAM28SzOj4hznp9')
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
    }
  }
}
</script>
