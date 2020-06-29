<template>
  <solicitudes-component
    v-bind:request="request"
    v-bind:solicitud="solicitud"
  />
</template>

<script>
import SolicitudesComponent from '../../components/specialists/solicitudesComponent'

export default {
  name: 'AccionConstructiva',
  layout: 'principal',
  title: 'Consultas',
  components: { SolicitudesComponent },
  data: () => ({
    request: {
      id: '',
      id_tipo_solicitud: '2'
    },
    solicitud: 'Todas'
  })
}
</script>

<style scoped>

</style>
