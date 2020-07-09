<template>
  <v-app id="inspire">
    <v-app-bar
      app
      style="background-color: #8d0000; border-color: #8d0000"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="blank" />
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
                  class="btn_salir"
                >
                  Entrar
                </v-btn>
              </template>

              <v-card class="elevation-12">
                <v-toolbar
                  color="#8d0000"
                  dark
                  flat
                >
                  <v-toolbar-title>Ingrese Usuario y Contraseña</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="text">
                  <v-form>
                    <v-text-field
                      v-model="usuario.nombre_usuario"
                      label="Usuario"
                      name="Usuario"
                      prepend-icon="person"
                      type="text"
                      color="#8d0000"
                    />

                    <v-text-field
                      id="password"
                      v-model="usuario.password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      color="#8d0000"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="loginUser(usuario)"
                    color="#8d0000"
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
                  class="btn_salir"
                >
                  Registrarse
                </v-btn>
              </template>

              <v-card class="elevation-12">
                <v-toolbar
                  color="#8d0000"
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
                        <v-btn
                          @click="close"
                          color="#8d0000"
                          dark
                        >
                          Cancelar
                        </v-btn>
                        <v-btn :disabled="invalid" @click="registrarse()" color="#cc5229" dark>
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
              class="btn_salir"
              to="/"
            >
              Salir
            </v-btn>
          </div>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    <menu-specialist-component
      v-if="user != null && user.id_rol == '2'"
      v-bind:nombre="user.nombre"
      v-bind:drawer="drawer"
      v-bind:items="specialistItems"
      v-bind:publicitems="publicitems"
    />
    <menu-specialist-component
      v-else-if="user != null && user.id_rol == '4'"
      v-bind:nombre="user.nombre"
      v-bind:drawer="drawer"
      v-bind:items="adminitems"
      v-bind:publicitems="publicitems"
    />
    <menu-specialist-component
      v-else-if="user != null && user.id_rol == '1'"
      v-bind:nombre="user.nombre"
      v-bind:drawer="drawer"
      v-bind:items="executivesItems"
      v-bind:publicitems="publicitems"
    />
    <navigation-drawer-component v-else-if="user != null" v-bind:drawer="drawer" v-bind:idrolUsuario="user.id_rol" v-bind:nombre="user.nombre" />
    <menu-public-component v-else-if="user === null" v-bind:items="publicitems" v-bind:drawer="drawer" />
    <!--    <navigation-drawer-component v-else v-bind:drawer= drawer v-bind:idrolUsuario="'0'" v-bind:nombre="''" />-->
    <v-content class="fondo">
      <v-container
        fluid
        class="fondo"
        style="color: black"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <nuxt />

            <v-snackbar
              v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
              :key="snackbar.text + Math.random()"
              v-model="snackbar.showing"
              :timeout="snackbar.timeout"
              :color="snackbar.color"
              :style="`bottom: ${(index * 60) + 8}px`"
            >
              {{ snackbar.text }}

              <v-btn @click="snackbar.showing = false" text>
                Cerrar
              </v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      app
      style="background-color: #8d0000; border-color: #8d0000"
    >
      <span class="white--text">&copy; 2020</span>
      <v-row
        justify="center"
      >
        <a
          href="https://www.youtube.com/channel/UCOifap34ZWDrG42gnY0Z3fw"
          class="align-icons"
        >
          <v-icon
            color="#cc5229"
            x-large
          >
            mdi-youtube
          </v-icon>
        </a>
        <a
          href="https://www.instagram.com/oh.camaguey.1997/"
          class="align-icons"
        >
          <v-icon
            color="#cc5229"
            large
            class="mdi-spin"
          >
            mdi-instagram
          </v-icon>
        </a>
        <a
          href="https://twitter.com/OHCamaguey"
          class="align-icons"
        >
          <v-icon
            color="#cc5229"
            large
          >
            mdi-twitter
          </v-icon>
        </a>
        <a
          href="https://www.facebook.com/oficinahistoriador/"
          class="align-icons a-fondo elementor-animation-grow"
        >
          <v-icon
            color="#cc5229"
            large
          >
            mdi-facebook
          </v-icon>
        </a>
      </v-row>
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
import MenuSpecialistComponent from '../components/menu/menuSpecialistComponent'
import MenuPublicComponent from '../components/menu/menuPublicComponent'
export default {
  components: { MenuPublicComponent, MenuSpecialistComponent, NavigationDrawerComponent, ValidationProvider, ValidationObserver },
  middleware: 'load-data',
  props: {
    source: String
  },
  mounted () {
  },
  computed: {
    ...mapState('users', [
      'user',
      'message'
    ]),
    ...mapState('snackbar', [
      'snackbars'
    ])
  },
  data: () => ({
    title: '',
    color: '#009688',
    text: 'My timeout is set to 2000.',
    timeout: 2000,
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
    drawer: true,
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
    },
    publicitems: [
      {
        icon: 'mdi-bookmark',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-magnify',
        title: 'Glosario',
        to: '/public/glosario'
      },
      {
        icon: 'mdi-book-multiple',
        title: 'Libros y Regulaciones',
        to: '/public/libroyregulaciones'
      },
      {
        icon: 'mdi-map',
        title: 'Mapa',
        to: '/public/mapa'
      },
      {
        icon: 'mdi-image-multiple',
        title: 'Galería',
        to: '/public/galeria'
      }],
    citizensItems: [
      {
        icon: 'mdi-bookmark',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-thought-bubble',
        title: 'Sugerencias',
        to: '/citizens/sugerencias'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Quejas',
        to: '/citizens/quejas'
      },
      {
        icon: 'mdi-magnify',
        title: 'Glosario',
        to: '/public/glosario'
      },
      {
        icon: 'mdi-book-multiple',
        title: 'Libros y Regulaciones',
        to: '/public/libroyregulaciones'
      },
      {
        icon: 'mdi-map',
        title: 'Mapa',
        to: '/public/mapa'
      },
      {
        icon: 'mdi-image-multiple',
        title: 'Galería',
        to: '/public/galeria'
      }],
    executivesItems: [
      { title: 'Inicio', icon: 'dashboard', to: '/' },
      { title: 'Directivos', icon: 'account_box', to: '/executives' },
      { title: 'Especialistas', icon: 'account_box', to: '/executives/specialist' },
      { title: 'Solicitudes Respondidas', icon: 'mdi-text-box-check', to: '/executives/graficos/solicitudesRespuestas' },
      { title: 'Evalucaión Promedio Especialistas', icon: 'account_box', to: '/executives/graficos/evalucaionPromedioEspecialistas' },
      { title: 'Comportamiento Solicitudes', icon: 'account_box', to: '/executives/graficos/comportamientoSolicitudesAnuales' }
    ],
    adminitems: [
      {
        icon: 'mdi-account',
        title: 'Gestionar Ciudadano',
        to: '/admin/gestionar/ciudadano'
      },
      {
        icon: 'mdi-account',
        title: 'Gestionar Especialista',
        to: '/admin/gestionar/especialista'
      },
      {
        icon: 'mdi-account',
        title: 'Gestionar Directivo',
        to: '/admin/gestionar/directivo'
      }
    ],
    specialistItems: [
      {
        icon: 'mdi-account',
        title: 'Consultas',
        to: '/specialists/consultas'
      },
      {
        icon: 'mdi-account',
        title: 'Acciónes Constructivas',
        to: '/specialists/accionConstructiva'
      },
      {
        icon: 'mdi-account',
        title: 'Consulta para Acciónes Constructivas',
        to: '/specialists/consultaaccionConstructiva'
      },
      {
        icon: 'mdi-account',
        title: 'Regulaciones TCP',
        to: '/specialists/regulacionestcp'
      },
      {
        icon: 'mdi-account',
        title: 'Sugerencias',
        to: '/specialists/sugerencias'
      },
      {
        icon: 'mdi-account',
        title: 'Quejas',
        to: '/specialists/quejas'
      }
    ]
  }),
  methods: {
    ...mapActions('users', [
      'login',
      'logout',
      'signup',
      'createCitizen'
    ]),
    async loginUser (usuario) {
      try {
        await this.login(usuario)
        if (this.message.error) {
          this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: this.message.message })
        } else { this.$store.dispatch('snackbar/setSnackbar', { text: this.message.message }) }
      } catch {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'error de conexión' })
      }
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

<style lang="css" scoped>
  .paleta {
    background-color: #8d0000;
    border-color: #8d0000;
  }
  .btn_salir {
    font-family: Verdana,serif;
    margin-top: 10px;
    background-color: #cc5229;
    margin-right: 5px;
  }
  .align {
    text-align: center;
  }
  .v-snack__content {
    -webkit-box-align: center;
    align-items: center;
    display: -webkit-box;
    display: block;
    min-height: 48px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    overflow: hidden;
    padding: 8px 16px;
    width: 100%;
  }
  .trans {
    transition: opacity .4s ease-in-out;
  }
  .a:not(.on-hover) {
    color: red;
  }
  .elementor-animation-grow {
    transition-duration: .3s;
    transition-property: transform;
  }
  .align-icons {
    margin-right: 15px
  }
  a, a:visited {
    color: #1e73be;
  }

  a, a:visited, a:hover, a:focus {
    text-decoration: none;
  }
  span {
    color: #8d0000;
  }
</style>
