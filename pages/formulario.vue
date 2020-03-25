<template>
  <section>
    <h3>VeeValidate - Nuxt Example:</h3>
    <ValidationProvider v-slot="{ errors }" rules="required|alpha">
      <input v-model="value" type="text">
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
  </section>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  data: () => ({
    value: ''
  })
}
</script>
