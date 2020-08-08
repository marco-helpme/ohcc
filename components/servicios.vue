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
        {{ item.title }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Servicios',
  props: {
    servicios: []
  }
}
</script>

<style scoped>

</style>
