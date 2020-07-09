<template>
  <div>
    <gestionar-nomenclador-component
      v-bind:title="title"
      v-bind:headers="headers"
      v-bind:items="cargos.data"
      v-bind:borrar="borrar"
    />
    <crear-nomenclador-component
      v-bind:label="'Nuevo Cargo'"
      v-bind:contexto="nuevoCargo"
      v-bind:crearand-act="crear"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GestionarNomencladorComponent from '~/components/admin/gestionarNomencladorComponent'
import CrearNomencladorComponent from '~/components/admin/crearNomencladorComponent'
export default {
  name: 'Index',
  components: { CrearNomencladorComponent, GestionarNomencladorComponent },
  layout: 'principal',
  computed: {
    ...mapState('cargo', ['cargos'])
  },
  data: () => ({
    title: 'Cargos',
    headers: [
      { text: 'Cargos', value: 'cargo' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
    ],
    nuevoCargo: {
      cargo: ''
    }
  }),
  mounted () {
    this.cargarCargos()
  },
  methods: {
    ...mapActions('cargo', [
      'cargarCargos',
      'crearCargo',
      'eliminarCargo'
    ]),
    async crear () {
      try {
        this.nuevoCargo.cargo.trim()
        const newCargo = await this.crearCargo(this.nuevoCargo)
        // await this.cargarCargos()
        this.$store.dispatch('snackbar/setSnackbar', { text: newCargo.message })
        this.nuevoCargo.cargo = ''
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: e.message })
      }
    },
    async borrar (item) {
      try {
        const cargoEliminado = await this.eliminarCargo(item)
        // await this.cargarCargos()
        this.$store.dispatch('snackbar/setSnackbar', { text: cargoEliminado.message })
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: e.message })
      }
    }
  }
}
</script>

<style scoped>

</style>
