<template>
  <v-list-item>
    <v-row
      v-if="estado == 1"
    >
      <v-icon
        color="#8d0000"
        style="margin-bottom: 13px; margin-right: 5px"
      >
        mdi-progress-alert
      </v-icon>
      <span class="subheading" style="padding-right: 5px"><p class="text text-right">Pendiente</p></span>
    </v-row>
    <v-row
      v-if="estado == 2"
    >
      <v-icon
        color="orange"
        style="margin-bottom: 13px; margin-right: 5px"
      >
        mdi-progress-clock
      </v-icon>
      <span class="subheading" style="padding-right: 5px"><p class="text text-right">En Progreso</p></span>
    </v-row>
    <v-row
      v-if="estado == 3"
    >
      <v-icon
        color="green"
        style="margin-bottom: 13px; margin-right: 5px"
      >
        mdi-progress-check
      </v-icon>
      <span class="subheading" style="padding-right: 5px"><p class="text text-right">Finalizado</p></span>
    </v-row>
    <v-row
      v-if="estado == 4"
    >
      <v-icon
        color="red"
        style="margin-bottom: 13px; margin-right: 5px"
      >
        mdi-progress-close
      </v-icon>
      <span class="subheading" style="padding-right: 5px"><p class="text text-right">Cancelado</p></span>
    </v-row>
  </v-list-item>
</template>

<script>
export default {
  name: 'EstadoComponent',
  props: {
    estado: {
      type: String
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 18px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
    color: #464646 !important;
  }
</style>
