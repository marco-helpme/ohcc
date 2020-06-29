<template>
  <v-container>
    <v-row>
      <v-col
        cols="9"
      >
        <v-list-item>
         <v-icon color="brown">mdi-calendar</v-icon> <h4>Fecha Creada:</h4> {{ fechaCreada }}
        </v-list-item>
        <v-list-item v-if="fechaIniciada != null">
          <v-icon color="blue">mdi-calendar-clock</v-icon><h4>Fecha Iniciada:</h4> <p class="separar"><p/>{{ fechaIniciada }}
        </v-list-item>
        <v-list-item v-if="fechaFinalizada != null">
          <h4><v-icon color="green">mdi-calendar-check</v-icon> Fecha Finalzada: {{ fechaFinalizada }}</h4>
        </v-list-item>
      </v-col>
      <v-col
        style="float: right"
      >
        <v-list-item>
          <estado-component v-bind:estado="estado" />
        </v-list-item>
        <v-list-item
          v-if="evaluacion < 0 "
        >
          <h4>Evalucaión:</h4> <span><v-spacer> no tiene</v-spacer></span>
        </v-list-item>
        <v-list-item
          v-else-if="evaluacion > 0"
        >
          <v-icon color="orange">mdi-star-circle</v-icon><h4>
            Evalucaión:
          </h4> {{ evaluacion }}
        </v-list-item>
        <v-list-item>
          <v-icon color="red">mdi-account-circle</v-icon><h4>No. Usuario:</h4> <span style="margin-left: 5px">{{ usario }}</span>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EstadoComponent from './estadoComponent'
export default {
  name: 'ConsultaDetalltesComponent',
  components: { EstadoComponent },
  props: {
    estado: {
      type: String
    },
    fechaCreada: {
      type: String
    },
    fechaIniciada: {
      type: String,
      default: '-'
    },
    fechaFinalizada: {
      type: String,
      default: '-'
    },
    evaluacion: {
      type: String,
      default: '-'
    },
    usario: {
      type: String
    }
  }
}
</script>

<style scoped>
.separar {
  margin-left: 5px;
}
</style>
