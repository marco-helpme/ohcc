<template>
  <div>
    <v-card>
      <v-card-title>
        <h1>Realice su queja</h1>
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="items.descripcion" label="Descripción" style="margin: 10px">
        </v-textarea>
      </v-card-text>
      <v-card-subtitle>
        <v-btn
          @click="sendSuggestion(items)"
          color="blue darken-1"
        >Enviar</v-btn>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Complain',
  data () {
    return {
      items: {
        fecha_creada: new Date(),
        descripcion: '',
        id_usuario: '79',
        id_tipo_solicitud: 5
      },
      defaultitems: {
        fecha_creada: new Date(),
        descripcion: '',
        id_usuario: '79',
        id_tipo_solicitud: 5
      }
    }
  },
  methods: {
    ...mapActions('suggestions', [
      'createRequest',
      'editSuggestion'
    ]),
    close () {
      this.items = Object.assign({}, this.defaultitems)
    },
    sendSuggestion () {
      this.createRequest(this.items)
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
