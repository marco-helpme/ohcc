<template>
  <v-container>
    <v-layout
      v-for="(item) in servicios"
      row
      wrap
      align-center
    >
      <v-flex
        xs12
        md4
      >
        <h1>Marco</h1>
        {{ item }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Servicios',
  data: () => ({
    sericios: [
      { title: 'Consulta', text: 'Brindamos el servicio de assesoria tecnica', color: 'red', icon: 'cancel' },
      { title: 'Asesoría Técnia', text: 'Brindamos el servicio de assesoria tecnica', color: 'blue', icon: 'diamond' },
      { title: 'Consulta para Acciones Constructivas', text: 'Brindamos el servicio de assesoria tecnica', color: 'indigo' },
      { title: 'Asesoría Técnia', text: 'Brindamos el servicio de assesoria tecnica', color: 'orange' },
      { title: 'Asesoría Técnia', text: 'Brindamos el servicio de assesoria tecnica', color: 'purple' }
    ]
  })
}
</script>

<style scoped>

</style>
