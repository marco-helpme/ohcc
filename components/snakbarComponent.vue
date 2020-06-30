<template>
  <v-snackbar
    v-model="snackbar.showing"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    :style="`bottom: ${(index * 60) + 8}px`"
  >
    {{ snackbar.text }}

    <v-btn @click="snackbar.showing = false" text>
      Cerrar
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnakbarComponent',
  props: {
    snackbar: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
