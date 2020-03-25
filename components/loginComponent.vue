<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            :href="source"
            v-on="on"
            icon
            large
            target="_blank"
          >
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
        </template>
        <span>Source</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            large
            href="https://codepen.io/johnjleider/pen/pMvGQO"
            target="_blank"
          >
            <v-icon>mdi-codepen</v-icon>
          </v-btn>
        </template>
        <span>Codepen</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="usuario.nombre_usuario"
          label="Login"
          name="login"
          prepend-icon="person"
          type="text"
        />

        <v-text-field
          id="password"
          v-model="usuario.password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="loginUser(usuario)" color="primary">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'LoginComponent',
  props: {
    source: String
  },
  data: () => ({
    usuario: {
      nombre_usuario: '',
      password: ''
    },
    ...mapState('users', [
      'user'
    ])
  }),
  methods: {
    ...mapActions('users', [
      'login'
    ]),
    // loginUser (usuario) {
    //   this.login(usuario)
    // },
    async loginUser (usuario) {
      try {
        await this.$auth.loginWith('local', {
          data: usuario
        })
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
