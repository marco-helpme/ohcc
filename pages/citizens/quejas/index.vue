<template id="my-table">
  <div>
    <template>
      <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" dark>
              Nueva Queja
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
                <v-btn :disabled="invalid" @click="save(sugerencia), dialog = false" color="blue darken-1" text>
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
                  <span class="title font-weight-light">Queja #{{ item.id_solicitud }}</span>
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
// import html2canvas from 'html2canvas'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'Index',
  layout: 'principal',
  components: { ValidationProvider, ValidationObserver },
  mounted () {
    this.setInfo(this.user.id_usuario)
    this.loadRquestUser(this.request)
  },
  created () {
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nueva Queja' : 'Editar Sugerencia'
    },
    ...mapState('users', [
      'user'
    ]),
    ...mapState('suggestions', [
      'requests_user'
    ])
  },
  data: () => ({
    hide: true,
    show: false,
    editedIndex: -1,
    dialog: false,
    dialog2: false,
    items: {
      descripcion: '',
      evaluacion: '',
      fecha_creada: '',
      fecha_iniciada: null,
      fecha_respuesta: null,
      respuesta: null
    },
    request: {
      id_usuario: '',
      id_tipo_solicitud: ''
    },
    sugerencia: {
      fecha_creada: '',
      descripcion: '',
      id_usuario: '',
      id_tipo_solicitud: ''
    },
    defaultsugerencia: {
      fecha_creada: '',
      descripcion: '',
      id_usuario: '',
      id_tipo_solicitud: ''
    }
  }),
  methods: {
    ...mapActions('suggestions', [
      'loadRquestUser',
      'createRequest',
      'deleteRequest'
    ]),
    nuevaSugerencia (sugerencia) {
      this.createRequest(sugerencia)
    },
    setInfo (userId) {
      this.sugerencia.id_usuario = userId
      this.sugerencia.id_tipo_solicitud = 5
      this.sugerencia.fecha_creada = new Date()
      this.request.id_usuario = userId
      this.request.id_tipo_solicitud = 5
      this.loadRquestUser(this.request)
    },
    save () {
      this.createRequest(this.sugerencia)
      this.close()
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.sugerencia = Object.assign({}, this.defaultsugerencia)
        this.editedIndex = -1
      }, 300)
    },
    deleteItem (item) {
      // const index = this.users.indexOf(item)
      confirm('Estas seguro que desea eliminar la queja') && this.deleteRequest(item)
    }
  }
}
</script>

<style lang="css">
</style>
