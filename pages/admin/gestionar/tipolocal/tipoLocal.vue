<template>
  <div>
    <v-btn
      @click="crear(nuevoLocal)"
    >
      crear local
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TipoLocal',
  layout: 'principal',
  data: () => ({
    nuevoLocal: {
      tipo_local: 'mi local'
    }
  }),
  methods: {
    ...mapActions('tipo_local', [
      'crearLocal'
    ]),
    async crear (local) {
      try {
        const payload = await this.crearLocal(local)
        this.$store.dispatch('snackbar/setSnackbar', { text: payload.message })
      } catch (e) {
        this.$store.dispatch('snackbar/setSnackbar', { color: 'red', text: e.message })
      }
    }
  }
}
</script>

<style scoped>

</style>
