<template>
  <v-dialog v-model="dialog2" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-icon
        v-if="estado === '1'"
        v-on="on"
        color="#cc5229"
        type="button"
      >
        edit
      </v-icon>
    </template>
    <validation-observer v-slot="{ invalid }">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <validation-provider v-slot="{ errors }" rules="max:1500|min:20|required">
                  <v-textarea
                    v-model="descripcion"
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
          <v-btn @click="dialog2 = false" color="red" dark>
            Cerrar
          </v-btn>
          <v-btn
            :disabled="invalid"
            @click="actualizar(reques= {
                      id_solicitud: idSolicitud,
                      fecha_creada: fechaCreada,
                      descripcion: descripcion,
                    }),
                    dialog2 = false"
            color="blue darken-1"
            dark
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </validation-observer>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import moment from 'moment'

export default {
  name: 'EditDescriptionUserComponent',
  components: { ValidationProvider, ValidationObserver },
  props: {
    estado: {
      type: String
    },
    descripcion: {
      type: String
    },
    updateDescriptionUser: {
      type: Function
    },
    loadRequestUser: {
      type: Function
    },
    idSolicitud: {
      type: String
    },
    idTipoSolicitud: {
      type: String
    }
  },
  data () {
    return {
      dialog2: false,
      fechaCreada: moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    async actualizar (request) {
      try {
        const request2 = {}
        request2.id_tipo_solicitud = this.idTipoSolicitud
        await this.updateDescriptionUser(request)
        await this.loadRequestUser(request2)
        this.$store.dispatch('snackbar/setSnackbar', { text: 'Su tramite ha sido actualizado' })
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'no se pudo editar el trámite' })
      }
    }
  }
}
</script>

<style scoped>

</style>
