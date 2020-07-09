<template>
  <div>
    {{cargos}}
    <v-input>
      <v-text-field
      v-model="nuevoCargo.cargo"
      >
      </v-text-field>
      <v-btn
              @click="crear(nuevoCargo)"
      >
        crear cargo
      </v-btn>
    </v-input>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Cargo',
  layout: 'principal',
  computed: {
    ...mapState('cargo', ['cargos'])
  },
  mounted () {
    this.cargarCargos()
  },
  data: () => ({
    nuevoCargo: {
      cargo: ''
    }
  }),
  methods: {
    ...mapActions('cargo', [
      'crearCargo',
      'cargarCargos'
    ]),
    async crear (cargo) {
      try {
        const newCargo = await this.crearCargo(cargo)
        this.$store.dispatch('snackbar/setSnackbar', { text: newCargo.message })
        this.cargarCargos()
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'Ups.. Ha ocurrido un error' })
      }
    }
  }
}
</script>

<style scoped>

</style>
