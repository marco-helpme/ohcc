<template>
  <div>
    <gestionar-nomenclador-component
      v-bind:title="title"
      v-bind:headers="headers"
      v-bind:items="local.data"
      v-bind:borrar="borrar"
    />
    <crear-nomenclador-component
      v-bind:label="'Nuevo Local'"
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
    ...mapState('tipo_local', ['local'])
  },
  data: () => ({
    title: 'Tipo de Local',
    headers: [
      { text: 'Local', value: 'local' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
    ],
    nuevoCargo: {
      local: ''
    }
  }),
  mounted () {
    this.cargarLocal()
  },
  methods: {
    ...mapActions('tipo_local', [
      'cargarLocal',
      'crearLocal',
      'eliminarLocal',
      'editarLocal'
    ]),
    async crear () {
      try {
        this.nuevoCargo.cargo.trim()
        const newCargo = await this.crearLocal(this.nuevoCargo)
        // await this.cargarCargos()
        this.$store.dispatch('snackbar/setSnackbar', { text: newCargo.message })
        this.nuevoCargo.cargo = ''
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: e.message })
      }
    },
    async borrar (item) {
      try {
        const cargoEliminado = await this.eliminarLocal(item)
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
