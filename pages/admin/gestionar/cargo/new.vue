<template>
  <v-input>
    <v-text-field
    v-model="nuevoCargo.cargo"
    ></v-text-field>
    <v-btn
    @click="crear(nuevoCargo)"
    >Crear</v-btn>
  </v-input>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'New',
  layout: 'principal',
  data: () => ({
    nuevoCargo: {
      cargo: ''
    }
  }),
  methods: {
    ...mapActions('cargo', [
      'crearCargo'
    ]),
    async crear (cargo) {
      try {
        const newCargo = await this.crearCargo(cargo)
        this.$store.dispatch('snackbar/setSnackbar', { text: newCargo.message })
        this.$router.push(`/admin/gestionar/cargo`)
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: e.message })
      }
    }
  }
}
</script>

<style scoped>

</style>
