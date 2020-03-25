<template>
  <div>
    <div class="container">
      <div class="Chart">
        <h1 style="text-align:center;">
          Evaluación Promedio de los Especilalistas
        </h1>
        <evaluacion-promedio-especialistas :chart-data="dataPoints" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import evaluacionPromedioEspecialistas from '../../../components/graficos/evaluacionPromedioEspecialistas'
export default {
  name: 'EvalucaionPromedioEspecialistas',
  layout: 'principal',
  components: { evaluacionPromedioEspecialistas },
  data: () => ({
    nombreEvaluaciones: [],
    promedioEvaluacionEspecialistas: [],
    cantidadEvaluadas: [],
    nombres: [],
    promedios: [],
    promediosEpecialistas: [],
    dataPoints: null
  }),
  computed: {
    ...mapState('graficos', [
      'nombreEvalucaion',
      'cantidadEvaluada'
    ])
  },
  created () {
    this.nombreEvaluaciones = this.nombreEvalucaion
    this.cantidadEvaluadas = this.cantidadEvaluada
    this.nombres = this.fillnombres()
    this.promedios = this.fillpromedios()
    this.promediosEpecialistas = this.fillPromediosEspecialistas(this.promedios)
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillnombres () {
      const nombres = []
      const array = this.nombreEvaluaciones
      for (let i = 0; i < array.length; i++) {
        if (!nombres.includes(array[i].nombre)) {
          nombres.push(array[i].nombre)
        }
      }
      return nombres
    },
    fillpromedios () {
      const promedios = []
      const nombres = this.nombres
      const array = this.nombreEvaluaciones
      for (let i = 0; i < nombres.length; i++) {
        promedios.push(this.getArrayEvaluacionesEspecialistas(nombres[i], array))
      }
      return promedios
    },
    CalcularPromedio (array) {
      let sumatoria = 0
      let cantidad = 0
      for (let i = 0; i < array.length; i++) {
        sumatoria = sumatoria + parseInt(array[i], 10)
        cantidad = cantidad + 1
      }
      const promedio = sumatoria / cantidad
      return promedio.toFixed(2)
    },
    getArrayEvaluacionesEspecialistas (nombre, array) {
      const evaluacionesEspecialistas = []
      for (let i = 0; i < array.length; i++) {
        if (nombre === array[i].nombre) {
          evaluacionesEspecialistas.push(array[i].evaluacion)
        }
      }
      return evaluacionesEspecialistas
    },
    fillPromediosEspecialistas (promedios) {
      const promediosEspecialistas = []
      for (let i = 0; i < 3; i++) {
        console.log('lista de promedios ' + promedios[i])
        promediosEspecialistas.push(this.CalcularPromedio(promedios[i]))
      }
      return promediosEspecialistas
    },
    fillColors () {
      const random = []
      this.nombres.forEach(element => random.push(this.getRandomColor()))
      return random
    },
    getRandomColor () {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    fillData () {
      this.dataPoints = {
        labels: this.nombres,
        datasets: [
          {
            backgroundColor: this.fillColors(),
            data: this.promediosEpecialistas
          }
        ]
      }
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
