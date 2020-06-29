<template>
  <v-snackbar
    v-model="snackbar"
    :color = "color"
  >
    <p style="font-size: 1.25rem">
      {{ mensaje }}
    </p>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnakbarComponent',
  props: {
    mensaje: {
      type: String
    },
    color: {
      type: String
    },
    snackbar: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>
