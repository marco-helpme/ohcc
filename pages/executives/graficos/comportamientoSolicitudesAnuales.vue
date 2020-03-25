<template>
  <div>
    <div class="container">
      <div class="Chart">
        <h1 style="text-align:center;">
          comportamiento de las Solicitudes por tipo de Solicitud
        </h1>
        <grafico-comportamiento-solicitudes :chart-data="dataPoints" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GraficoComportamientoSolicitudes from '../../../components/graficos/graficoComportamientoSolicitudes'
export default {
  name: 'ComportamientoSolicitudesAnuales',
  components: { GraficoComportamientoSolicitudes },
  layout: 'principal',
  data: () => ({
    dataPoints: null,
    tipoSolicitudCantidades: []
  }),
  computed: {
    ...mapState('graficos', [
      'tipoSolicitudCantidad'
    ])
  },
  created () {
    this.tipoSolicitudCantidades = this.tipoSolicitudCantidad
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillnombre (array) {
      const nombres = []
      for (let i = 0; i < array.length; i++) {
        nombres.push(array[i].tipo_solicitud)
      }
      return nombres
    },
    fillvalores (array) {
      const valores = []
      for (let i = 0; i < array.length; i++) {
        valores.push(array[i].cantidadSugerencia)
      }
      return valores
    },
    fillData () {
      this.dataPoints = {
        labels: this.fillnombre(this.tipoSolicitudCantidades),
        datasets: [
          {
            label: 'Solicitudes',
            backgroundColor: 'darkslateblue',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: this.fillvalores(this.tipoSolicitudCantidades)
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 800px;
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
