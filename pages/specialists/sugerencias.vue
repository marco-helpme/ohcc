<template>
  <solicitudes-component
    v-bind:request="request"
    v-bind:solicitud="solicitud"
  />
</template>

<script>
import SolicitudesComponent from '../../components/specialists/solicitudesComponent'
export default {
  name: 'Sugerencias',
  layout: 'principal',
  components: { SolicitudesComponent },
  data: () => ({
    request: {
      id: '',
      id_tipo_solicitud: '6'
    },
    solicitud: 'Todas'
  })
}
</script>

<style scoped>

</style>
