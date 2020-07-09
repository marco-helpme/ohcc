
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        color="#cc5229"
        type="button"
        v-bind:title="label"
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
                <validation-provider v-slot="{ errors }" rules="max:50|min:2|required">
                  <v-textarea
                    v-model="contexto.cargo"
                    v-bind:label="label"
                    auto-grow
                    clearable
                    filled
                    shaped
                    required
                    color="#8d0000"
                    counter="50"
                  />
                  <span>{{ errors[0] }}</span>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="cancelar" color="red" dark>
            <v-icon>mdi-close</v-icon>Cerrar
          </v-btn>
          <v-btn :disabled="invalid" @click="crearandAct(), dialog = false" color="blue darken-1" dark>
            <v-icon class="mr-1">
              mdi-send
            </v-icon>Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </validation-observer>
  </v-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'CrearNomencladorComponent',
  components: { ValidationProvider, ValidationObserver },
  props: {
    contexto: {
      type: Object
    },
    crearandAct: {
      type: Function
    },
    label: {
      type: String
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    cancelar () {
      this.dialog = false
      this.contexto.cargo = ''
    }
  }
}
</script>

<style scoped>

</style>
