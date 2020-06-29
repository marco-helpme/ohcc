<template id="my-table">
  <v-container>
    <v-row>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="#cc5229"
            type="button"
            aria-label="Scroll to top"
            title="Scroll to top"
            class="v-btn v-btn--bottom v-btn--contained v-btn--fab v-btn--fixed v-btn--right v-btn--round theme--dark v-size--large red"
            style="transform-origin: center center 0px;"
          >
            <span class="v-btn__content"><i
              aria-hidden="true"
              class="v-icon notranslate mdi mdi-plus theme--dark"
            /></span>
          </v-btn>
        </template>
        <validation-observer v-slot="{ invalid }">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <validation-provider v-slot="{ errors }" rules="max:1500|min:20|required">
                      <v-textarea
                        v-model="sugerencia.descripcion"
                        label="Descripcón"
                        auto-grow
                        clearable
                        filled
                        shaped
                        required
                        color="#8d0000"
                      />
                      <span>{{ errors[0] }}</span>
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="dialog = false" color="red" dark>
                Cerrar
              </v-btn>
              <v-btn :disabled="invalid" @click="crearandAct(), dialog = false" color="blue darken-1" dark>
                Enviar
              </v-btn>
            </v-card-actions>
          </v-card>
        </validation-observer>
      </v-dialog>
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
                <v-col
                  v-if="item.id_estado === '1'"
                  cols="1"
                >
                  <edit-description-user-component
                    v-bind:estado="item.id_estado"
                    v-bind:descripcion="item.descripcion"
                    v-bind:update-description-user="updateDescriptionUser"
                    v-bind:id-solicitud="item.id_solicitud"
                    v-bind:load-request-user="loadRquestUser"
                    v-bind:id-tipo-solicitud="request.id_tipo_solicitud"
                  />
                  <v-icon
                    @click="deleteItem(item)"
                    color="red"
                  >
                    delete
                  </v-icon>
                </v-col>
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
    <v-snackbar
      v-model="snackbar"
      color="#009688"
      top
      small
      class="align"
    >
      <p>{{ mensaje }}</p>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Estado from '../../../components/estado'
import EditDescriptionUserComponent from '../../../components/citizens/editDescriptionUserComponent'
export default {
  middleware: 'redirect',
  head: { 'titleTemplate': '%s - Sugerencias' },
  name: 'Index',
  layout: 'principal',
  components: { EditDescriptionUserComponent, Estado, ValidationProvider, ValidationObserver },
  data () {
    return {
      rol: 3,
      requesteval: {
        id_solicitud: '141',
        evaluacion: 4
      },
      rating: 1,
      snackbar: false,
      timeout: 2000,
      dialog: false,
      dialog2: false,
      solicitudes: '',
      request: {
        id_tipo_solicitud: 6
      },
      date: moment().format('YYYY-MM-DD'),
      sugerencia: {
        fecha_creada: moment().format('YYYY-MM-DD'),
        descripcion: '',
        id_usuario: '',
        id_tipo_solicitud: 6
      }
    }
  },
  computed: {
    ...mapState('suggestions', [
      'requests_user',
      'mensaje'
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
    filluserId () {
      this.sugerencia.id_usuario = this.user.id_usuario
      this.request.id_usuario = this.user.id_usuario
    },
    async load () {
      await this.filluserId()
    },
    async deleteItem (item) {
      await this.deleteRequest(item)
      this.snackbar = true
      this.loadRquestUser(this.request)
    },
    async crearandAct () {
      await this.filluserId()
      await this.createRequest(this.sugerencia)
      this.snackbar = true
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
