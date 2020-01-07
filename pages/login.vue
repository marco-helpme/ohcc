<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm :submitForm="loginUser" buttin-text="Login" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
export default {
  components: {
    UserAuthForm
  },
  methods: {
    loginUser () {
      alert('you pressed a button')
    }
  }

}
</script>

<style scoped>

</style>
