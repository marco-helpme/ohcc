import { Radar } from '~/utils/BaseCharts'
import { reactiveProp } from '~/utils/mixins'

export default {
  extends: Radar,
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
  // mounted () {
  //   this.renderChart({
  //     labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  //     datasets: [
  //       {
  //         label: 'My First dataset',
  //         backgroundColor: 'rgba(179,181,198,0.2)',
  //         borderColor: 'rgba(179,181,198,1)',
  //         pointBackgroundColor: 'rgba(179,181,198,1)',
  //         pointBorderColor: '#fff',
  //         pointHoverBackgroundColor: '#fff',
  //         pointHoverBorderColor: 'rgba(179,181,198,1)',
  //         data: [65, 59, 90, 81, 56, 55, 40]
  //       }
  //     ]
  //   }, { responsive: true, maintainAspectRatio: false })
  // }
}
