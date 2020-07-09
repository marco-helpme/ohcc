<template>
  <div>
    <h1>
      new tipo de ciudadano
    </h1>
    <template>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="nuevoTipoCiudadano.tipo"
                :rules="nameRules"
                :counter="35"
                label="Tipo de Ciudadano"
                required
              />
            </v-col>
          </v-row>
            <v-btn class="mr-4" @click="crear">submit</v-btn>
        </v-container>
      </v-form>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'New',
  data: () => ({
    nuevoTipoCiudadano: {
      tipo: ''
    },
    valid: false,
    firstname: '',
    nameRules: [
      v => !!v || 'El tipo de ciudadano es requerido',
      v => v.length <= 35 || 'Debe tener menos de 10 caracteres'
    ]
  }),
  methods: {
    ...mapActions('citizen_type', [
      'crearTipoCiudadano'
    ]),
    async crear () {
      try {
        const payload = await this.crearTipoCiudadano(this.nuevoTipoCiudadano)
        this.$store.dispatch('snackbar/setSnackbar', { text: payload.message })
        this.$router.push(`/admin/gestionar/tipo_ciudadano`)
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: e.message })
      }
    }
  }
}
</script>

<style scoped>

</style>
