<template>
  <solicitudes-component
    v-bind:request="request"
    v-bind:solicitud="solicitud"
  />
</template>

<script>
import SolicitudesComponent from '../../components/specialists/solicitudesComponent'
export default {
  name: 'Consultas',
  layout: 'principal',
  title: 'Consultas',
  components: { SolicitudesComponent },
  data: () => ({
    request: {
      id: '',
      id_tipo_solicitud: '1'
    },
    solicitud: 'Todas'
  })
}
</script>

<style scoped>
  .glossary {
    border-width: 3px !important;
    border-color: #8d0000 !important;
    border-style: solid !important;
  }
  .line {
    border-width: 1px !important;
    border-color: #8d0000 !important;
    border-style: solid !important;
  }
  .title {
    font-size: 24px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
  }
  .text {
    font-size: 18px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
    color: #464646 !important;
  }
  .v-application .primary--text {
    color: #8d0000 !important;
    caret-color: #8d0000 !important;
  }
  .v-label.primary--text {
    color: #8d0000 !important;
    caret-color: #8d0000 !important;
  }
</style>
