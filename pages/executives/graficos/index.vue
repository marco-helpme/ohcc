<template>
  <div class="container">
    <div class="Chart">
      <h1 style="text-align:center;">
        Barchart with reactive mixing for live data as props
      </h1>
      <reactive-prop-example :chart-data="dataPoints" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReactivePropExample from '../../../components/graficos/ReactivePropExample'
export default {
  name: 'Index',
  layout: 'principal',
  components: { ReactivePropExample },
  data: () => ({
    dataPoints: {
      labels: [],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    }
  }),
  mounted () {
    // this.fillnames()
  },
  created () {
    this.fillnames()
  },
  computed: {
    ...mapState('specialists', [
      'specialistUserData'
    ])
  },
  methods: {
    filldata () {
      this.dataPoints = {
        labels: this.users,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      }
    },
    fillnames () {
      const nombre = []
      const idUser = []
      this.specialistUserData.forEach(element => nombre.push(element.nombre))
      this.specialistUserData.forEach(element => idUser.push(parseInt(element.id_usuario, 10)))
      this.dataPoints.labels = nombre
      this.dataPoints.datasets[0].data = idUser
      // this.specialistUserData.forEach(element => this.dataPoints.labels.push(element.nombre))
      // this.specialistUserData.forEach(element => this.dataPoints.datasets[0].data.push(parseInt(element.id_usuario, 10)))
    }
  }
}
</script>

<style scoped>

</style>
