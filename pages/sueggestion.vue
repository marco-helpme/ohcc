<template>
  <div>
    <v-container>
      <v-layout>
        <v-row>
          <v-col
            md-6
          >
            <v-card>
              <v-row>
                <v-col
                  md-12
                >
                  <v-card-title>
                    <h1>Sujerencia del usuario</h1>
                  </v-card-title>
                </v-col>
              </v-row>

              <v-form>
                <v-row>
                  <v-col
                    md-12
                  >
                    <v-textarea v-model="items.descripcion" label="Descripción" style="margin: 10px" />
                  </v-col>
                </v-row>
                <v-card-subtitle>
                  <v-btn
                    @click="sendSuggestion(items)"
                    color="blue darken-1"
                  >
                    Enviar
                  </v-btn>
                </v-card-subtitle>
              </v-form>
            </v-card>
          </v-col>
          <v-col
            md-6
          >
            <complain />
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Complain from '../components/complain'

export default {
  name: 'Sueggestion',
  components: { Complain },
  data () {
    return {
      items: {
        fecha_creada: new Date(),
        descripcion: '',
        id_usuario: '79',
        id_tipo_solicitud: 6
      }
    }
  },
  methods: {
    ...mapActions('suggestions', [
      'createRequest',
      'editSuggestion'
    ]),
    sendSuggestion () {
      this.createRequest(this.items)
    }
  }
}
</script>

<style scoped>
</style>
