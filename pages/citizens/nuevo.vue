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
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <validation-provider v-slot="{ errors }" rules="max:1500|min:20">
                      <v-textarea
                        v-model="sugerencia.descripcion"
                        label="Descripcón"
                        auto-grow
                        clearable
                        filled
                        shaped
                        required
                      />
                      <span>{{ errors[0] }}</span>
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="dialog = false" color="blue darken-1" text>
                Cerrar
              </v-btn>
              <v-btn :disabled="invalid" @click="crearandAct(), dialog = false" color="blue darken-1" text>
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
      <v-col
      >
        <v-card
          class="glossary"
          color="white"
        >
          <v-card-title>
            <v-row
            align="center"
            justify="left"
            >
              <v-col
              align="left"
              >
                <span class="title font-weight-light"># {{ item.id_solicitud }}</span>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="end"
            >
              <v-icon
                @click="deleteItem(item)"
                small
                color="blue"
              >
                delete
              </v-icon>
            </v-row>
          </v-card-title>
          <v-card-text class="headline font-weight-bold" style="float: left">
            <p class="text text-left">{{ item.descripcion }}</p>
            <hr style="" class="line">
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-content>
                <p class="text text-left">{{ item.fecha_creada }}</p>
              </v-list-item-content>
              <v-row
                align="center"
                justify="end"
              >
                <span v-if="item.id_estado == 1" class="subheading" style="padding-right: 5px"><p>Pendiente</p></span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      color="#009688"
      top
      class="align"
    >
      <p>Seguro que desea eliminar</p>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'Nuevo',
  layout: 'principal',
  components: { ValidationProvider, ValidationObserver },
  data () {
    return {
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      dialog: false,
      solicitudes: '',
      request: {
        id_usuario: 95,
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
      'requests_user'
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
      'deleteRequest'
    ]),
    filluserId () {
      this.sugerencia.id_usuario = this.user.id_usuario
    },
    async deleteItem (item) {
      await this.deleteRequest(item)
      this.snackbar = true
      this.loadRquestUser(this.request)
    },
    async crearandAct () {
      await this.filluserId()
      await this.createRequest(this.sugerencia)
      this.loadRquestUser(this.request)
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
}
</script>

<style scoped>
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
</style>
