<template>
  <v-container>
    <v-row>
      <crear-consulta-component
        v-bind:consulta="sugerencia"
        v-bind:crearand-act="crearandAct"
      />
    </v-row>
    <v-row
      v-for="item in requests_user"
      :key="item.id_solicitud"
    >
      <v-col>
        <v-hover
          v-slot:default="{ hover }"
          open-delay="200"
        >
          <v-card
            :elevation="hover ? 16 : 2"
            class="glossary"
            color="white"
          >
            <v-card-title>
              <v-row
                align="center"
              >
                <v-col
                  align="left"
                >
                  <span class="title font-weight-light"># {{ item.id_solicitud }}</span>
                </v-col>
                <v-row
                  justify="end"
                  align="start"
                  class="m-1"
                >
                  <v-col
                    v-if="item.id_estado === '1'"
                    sm="1"
                    offset-sm="1"
                    class="ml-2"
                  >
                    <edit-description-user-component
                      v-bind:estado="item.id_estado"
                      v-bind:descripcion="item.descripcion"
                      v-bind:update-description-user="updateDescriptionUser"
                      v-bind:id-solicitud="item.id_solicitud"
                      v-bind:load-request-user="loadRquestUser"
                      v-bind:id-tipo-solicitud="request.id_tipo_solicitud"
                    />
                  </v-col>
                  <v-col
                    v-if="item.id_estado === '1'"
                    sm="1"
                    class="mr-2"
                  >
                    <eliminar-tramite-component
                      v-bind:eliminar="deleteItem"
                      v-bind:item="item"
                    />
                  </v-col>
                </v-row>
              </v-row>
            </v-card-title>
            <v-card-text class="headline font-weight-bold" style="float: left">
              <p class="text text-left">
                {{ item.descripcion }}
              </p>
              <hr style="" class="line">
            </v-card-text>
            <v-card-text v-if="item.respuesta != null" class="headline text font-weight-bold text-left" style="float: left">
              Respuesta: {{ item.respuesta }}
              <p class="text text-left" />
              <v-rating
                v-model="item.evaluacion"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
              />
              <v-btn
                @click="userEvaluation(requesteval = {
                  id_solicitud: item.id_solicitud,
                  evaluacion: item.evaluacion
                })"
                color="primary"
                text
              >
                Evaluar
              </v-btn>
            </v-card-text>
            <v-card-actions>
              <estado v-bind:estado="item.id_estado" v-bind:fecha="item.fecha_creada" />
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Estado from '../../../components/estado'
import EditDescriptionUserComponent from '../../../components/citizens/editDescriptionUserComponent'
import EliminarTramiteComponent from '~/components/eliminarTramiteComponent'
import CrearConsultaComponent from '~/components/citizens/CrearConsultaComponent'
export default {
  middleware: 'redirect',
  head: { 'titleTemplate': '%s - Acción Constructiva' },
  name: 'Index',
  layout: 'principal',
  components: { CrearConsultaComponent, EliminarTramiteComponent, EditDescriptionUserComponent, Estado },
  data () {
    return {
      eliminarDailog: false,
      rol: 3,
      requesteval: {
        id_solicitud: '141',
        evaluacion: 4
      },
      rating: 1,
      timeout: 2000,
      dialog: false,
      dialog2: false,
      solicitudes: '',
      request: {
        id_tipo_solicitud: 2
      },
      date: moment().format('YYYY-MM-DD'),
      sugerencia: {
        fecha_creada: moment().format('YYYY-MM-DD'),
        descripcion: '',
        id_usuario: '',
        id_tipo_solicitud: 2
      }
    }
  },
  computed: {
    ...mapState('suggestions', [
      'requests_user',
      'mensaje',
      'consulta'
    ]),
    ...mapState('users', [
      'user'
    ])
  },
  created () {
    this.loadRquestUser(this.request)
  },
  mounted () {
  },
  methods: {
    ...mapActions('suggestions', [
      'loadRquestUser',
      'createRequest',
      'deleteRequest',
      'userEvaluation',
      'updateDescriptionUser'
    ]),
    ...mapActions('snackbar', [
      'setSnackbar'
    ]),
    filluserId () {
      this.sugerencia.id_usuario = this.user.id_usuario
      this.request.id_usuario = this.user.id_usuario
    },
    async load () {
      await this.filluserId()
    },
    async deleteItem (item) {
      try {
        const a = await this.deleteRequest(item)
        if (this.consulta.error) {
          this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: a.message })
        } else {
          this.$store.dispatch('snackbar/setSnackbar', { text: this.mensaje })
        }
        this.loadRquestUser(this.request)
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'Se ha perdido la conexión con el servidor, intente en un momento' })
      }
    },
    async crearandAct () {
      await this.filluserId()
      await this.createRequest(this.sugerencia)
      if (this.consulta.error === true) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: this.consulta.message })
      } else { this.$store.dispatch('snackbar/setSnackbar', { text: this.consulta.message }) }
      this.loadRquestUser(this.request)
      this.sugerencia.descripcion = ''
    },
    yyyymmdd () {
      const mm = this.getMonth() + 1 // getMonth() is zero-based
      const dd = this.getDate()

      return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
      ].join('')
    }
  }
  // watch: {
  //   user (val) {
  //     if (this.user == null) {
  //       this.$router.push('/')
  //     } else if (this.user.id_rol !== 3) {
  //       this.$router.push('/')
  //     }
  //   }
  // }
}
</script>

<style lang="css" scoped>
    .glossary {
        border-width: 3px !important;
        border-color: #8d0000 !important;
        border-style: solid !important;
    }
    .line {
        border-width: 1px !important;
        border-color: #8d0000 !important;
        border-style: solid !important;
    }
    .title {
        font-size: 24px !important;
        font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
    }
    .text {
        font-size: 18px !important;
        font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
        color: #464646 !important;
    }
    .v-application .primary--text {
        color: #8d0000 !important;
        caret-color: #8d0000 !important;
    }
    .v-label.primary--text {
        color: #8d0000 !important;
        caret-color: #8d0000 !important;
    }
</style>
