<template>
  <div class="container">
    <v-form @submit.prevent="createCitizen(citizen)">
      <input type="text" class="form-control mb-2" v-model="citizen.nombre">
      <input type="text" class="form-control mb-2" v-model="citizen.apellido_1">
      <input type="text" class="form-control mb-2" v-model="citizen.apellido_2">
      <input type="text" class="form-control mb-2" v-model="citizen.nombre_usuario">
      <input type="text" class="form-control mb-2" v-model="citizen.password">
      <input type="text" class="form-control mb-2" v-model="citizen.id_rol">
      <input type="text" class="form-control mb-2" v-model="citizen.ci">
      <input type="text" class="form-control mb-2" v-model="citizen.dir_particular">
      <input type="text" class="form-control mb-2" v-model="citizen.telef">
      <input type="text" class="form-control mb-2" v-model="citizen.email">
      <input type="text" class="form-control mb-2" v-model="citizen.id_tipo_ciudadano">
      <v-btn type="submit">Crear</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'New',
  data () {
    return {
      citizen: {}
    }
  },
  methods: {
    ...mapActions('citizens', [
      'createCitizen'
    ])
  }
}
</script>

<style scoped>

</style>
