<template>
  <v-app id="inspire">
    <navigation-drawer-component v-if="user != null" v-bind:idrolUsuario="user.id_rol" />
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>
        Orientación y Consulta
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <template>
          <!--          entrar-->
          <div v-if="this.user === null || this.user === undefined" class="text-center">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  color="white"
                  text
                  dark
                >
                  Entrar
                </v-btn>
              </template>

              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Ingrese Usuario y Contraseña</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="usuario.nombre_usuario"
                      label="Usuario"
                      name="Usuario"
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
                  <v-btn
                    @click="loginUser(usuario)"
                    color="primary"
                    dark
                  >
                    Entrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!--          Registrarse-->
          <div v-if="this.user === null || this.user === undefined">
            <v-dialog
              v-model="dialog2"
              width="800px"
            >
              <template v-slot:activator="{ on: dialog2 }">
                <v-btn
                  v-on="dialog2"
                  color="white"
                  text
                  dark
                >
                  Registrarse
                </v-btn>
              </template>

              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Registrese</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <validation-observer ref="observer" v-slot="{ invalid }">
                    <v-form>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                                <v-text-field id="nombre" v-model="editedItem.nombre" label="Nombre" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                                <v-text-field v-model="editedItem.apellido_1" label="Primer Apellido" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                                <v-text-field v-model="editedItem.apellido_2" label="Segundo Apellido" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="required|alpha_num|max:10|min:3">
                                <v-text-field v-model="editedItem.nombre_usuario" label="Nombre de Usuario" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
<!--                            <v-col cols="12">-->
<!--                              <validation-provider v-slot="{ errors }" rules="numeric|ci">-->
<!--                                <v-text-field v-model="editedItem.ci" label="Ci" />-->
<!--                                <span>{{ errors[0] }}</span>-->
<!--                              </validation-provider>-->
<!--                            </v-col>-->
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="max:80|min:30">
                                <v-text-field v-model="editedItem.dir_particular" label="Dirección Particular" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="numeric|diferente|minphone:6|maxphone:8">
                                <v-text-field v-model="editedItem.telef" label="Teléfono" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="email">
                                <v-text-field v-model="editedItem.email" type="email" label="Correo Electrónico" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="required|max:15|min:6" vid="confirmation">
                                <v-text-field v-model="editedItem.password" label="Contraseña" type="password" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12">
                              <validation-provider v-slot="{ errors }" rules="required|confirmed:confirmation">
                                <v-text-field v-model="confirmation" type="password" label="Repita la Contraseña" />
                                <span>{{ errors[0] }}</span>
                              </validation-provider>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />
                        <v-btn @click="close" color="blue darken-1" text>
                          Cancelar
                        </v-btn>
                        <v-btn :disabled="invalid" @click="registrarse()" color="blue darken-1" text>
                          Enviar
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </validation-observer>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
          <!--          Salir-->
          <div v-if="this.user != null">
            <v-btn
              v-on="on"
              @click="salir()"
              color="white"
              text
              dark
              to="/"
            >
              Salir
            </v-btn>
          </div>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import MenuCiudadano from '../components/menu/menuCiudadano'
// import MenuSpecialistComponent from '../components/menu/menuSpecialistComponent'
// import MenuDirectivoComponent from '../components/menu/menuDirectivoComponent'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import NavigationDrawerComponent from '../components/menu/navigationDrawerComponent'
export default {
  components: { NavigationDrawerComponent, ValidationProvider, ValidationObserver },
  props: {
    source: String
  },
  mounted () {
  },
  computed: {
    ...mapState('users', [
      'user',
      'message'
    ])
  },
  data: () => ({
    confirmation: '',
    error: '',
    editedIndex: -1,
    editedItem: {
      nombre: '',
      nombre_usuario: '',
      apellido_1: '',
      apellido_2: '',
      ci: 0,
      dir_particular: '',
      telef: 0,
      email: '',
      id_tipo_ciudadano: '1',
      password: '',
      id_rol: '3'
    },
    defaultItem: {
      nombre: '',
      nombre_usuario: '',
      apellido_1: '',
      apellido_2: '',
      ci: 0,
      dir_particular: '',
      telef: 0,
      email: '',
      id_tipo_ciudadano: '1',
      password: '',
      id_rol: '3'
    },
    id_rol: '',
    userlogin: {},
    usuario: {
      nombre_usuario: '',
      password: ''
    },
    dialog: false,
    dialog2: false,
    drawer: null,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-account',
        title: 'Usuarios',
        to: '/users'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Ciudadanos',
        to: '/citizens'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Sujerencias',
        to: '/suggestions'
      }
    ],
    citizen: {
      'nombre': '',
      'apellido_1': '',
      'apellido_2': '',
      'nombre_usuario': '',
      'password': '',
      'id_rol': '',
      'ci': '',
      'dir_particular': '',
      'telef': '',
      'email': '',
      'id_tipo_ciudadano': '',
      'latitud_vivienda': '',
      'longitud_vivienda': ''
    }
  }),
  methods: {
    ...mapActions('users', [
      'login',
      'logout',
      'signup',
      'createCitizen'
    ]),
    loginUser (usuario) {
      this.login(usuario)
    },
    salir () {
      this.logout()
    },
    registrarse () {
      this.signup(this.editedItem)
    },
    close () {
      this.dialog2 = false
      setTimeout(() => {
        this.citizen = Object.assign({}, this.defaultItem)
      }, 300)
    }
  }
}
</script>

<style lang="css">
</style>
