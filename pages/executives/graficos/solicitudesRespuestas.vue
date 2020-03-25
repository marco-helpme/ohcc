<template>
  <div class="container">
    <div class="Chart">
      <h1 style="text-align:center;">
        Solicitudes Respondidas por Especialistas
      </h1>
      <h2 style="text-align:center;">
        Total de Solicitudes {{ totalSolicitud[0].total }}
      </h2>
      <h3 style="text-align:center;">
        Respondidas {{ cantidadRespondidas[0].cantidadRespondida }}
      </h3>
      <grafico-solicitudes-respuestas :chart-data="dataPoints" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GraficoSolicitudesRespuestas from '@/components/graficos/graficoSolicitudesRespuestas'
export default {
  name: 'SolicitudesRespuestas',
  components: { GraficoSolicitudesRespuestas },
  layout: 'principal',
  data: () => ({
    dataPoints: null,
    totalSolicitud: [],
    especialistasArray: [],
    nombresEspecialistas: [],
    cantidadRespondidas: [],
    nombreCantidades: []
  }),
  computed: {
    ...mapState('graficos', [
      'totalSolicitudes',
      'especialistas',
      'cantidadRespondida',
      'nombreCantidad'
    ])
  },
  created () {
    this.totalSolicitud = this.totalSolicitudes
    this.especialistasArray = this.especialistas
    this.cantidadRespondidas = this.cantidadRespondida
    this.nombreCantidades = this.nombreCantidad
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.dataPoints = {
        labels: this.fillLabels(),
        datasets: [
          {
            backgroundColor: this.fillColors(),
            data: this.fillDatos()
          }
        ]
      }
    },
    fillLabels () {
      const labels = []
      this.nombreCantidades.forEach(element => labels.push(element.nombre))
      return labels
    },
    fillDatos () {
      const datos = []
      this.nombreCantidades.forEach(element => datos.push(element.contidad))
      return datos
    },
    fillColors () {
      const random = []
      this.nombreCantidades.forEach(element => random.push(this.getRandomColor()))
      return random
    },
    getRandomColor () {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }

  h1 {
    font-family: 'Helvetica', Arial;
    color: white;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }

  .Chart {
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
</style>
