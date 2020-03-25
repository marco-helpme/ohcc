import { Doughnut } from '~/utils/BaseCharts'
import { reactiveProp } from '~/utils/mixins'
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}

// labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
//   datasets: [
//   {
//     backgroundColor: [
//       '#41B883',
//       '#E46651',
//       '#00D8FF',
//       '#DD1B16'
//     ],
//     data: [40, 20, 80, 10]
//   }
// ]
