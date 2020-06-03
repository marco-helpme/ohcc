<template id="my-table">
  <div>
    <template>
      <v-row>
        <div>
          <h1>Moment</h1>
          {{ date }}
          <v-btn @click="crearandAct()" color="primary" dark>
            Nueva Sugerencia
          </v-btn>
        </div>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template>
            <v-btn @click="crearandAct()" color="primary" dark>
              Nueva Sugerencia
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
    </template>
    <template>
      <v-item-group multiple>
        <v-container>
          <v-row>
            <v-col
              v-for="item in requests_user"
              :key="item.id_solicitud"
              cols="12"
              md="4"
            >
              <v-dialog />
              <v-card
                class="mx-auto"
                color="#26c6da"
                dark
                max-width="400"
              >
                <v-card-title>
                  <span class="title font-weight-light">Sugerencia #{{ item.id_solicitud }}</span>
                  <v-row
                    align="center"
                    justify="end"
                  >
                    <v-icon
                      @click="deleteItem(item)"
                      small
                    >
                      delete
                    </v-icon>
                  </v-row>
                </v-card-title>

                <v-card-text v-show="hide" v-if="item.descripcion.length > 100" v-slot:activator="{ on }" class="headline font-weight-bold">
                  {{ item.descripcion.substr(0, 100) }}...
                  <v-btn
                    v-on="on"
                    @click="show = !show, hide =! hide"
                    icon
                  >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-text>
                <v-card-text v-else class="headline font-weight-bold">
                  {{ item.descripcion }}
                </v-card-text>
                <v-expand-transition>
                  <div v-show="show">
                    <v-card-text class="headline font-weight-bold">
                      {{ item.descripcion }}
                      <v-btn
                        @click="show = !show, hide =! hide"
                        icon
                      >
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-card-text>
                  </div>
                </v-expand-transition>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.fecha_creada }} </v-list-item-title>
                    </v-list-item-content>
                    <v-row
                      align="center"
                      justify="end"
                    >
                      <span v-if="item.id_estado == 1" class="subheading" style="padding-right: 5px">Pendiente</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'Nuevo',
  layout: 'principal',
  data () {
    return {
      dialog: false,
      solicitudes: '',
      request: {
        id_usuario: 95,
        id_tipo_solicitud: 6
      },
      date: moment().format('YYYY-MM-DD'),
      sugerencia: {
        fecha_creada: moment().format('YYYY-MM-DD'),
        descripcion: 'creo que encontre la solucion gaaaaa',
        id_usuario: 95,
        id_tipo_solicitud: 6
      }
    }
  },
  computed: {
    ...mapState('suggestions', [
      'requests_user'
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
      'createRequest'
    ]),
    async crearandAct () {
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

</style>
