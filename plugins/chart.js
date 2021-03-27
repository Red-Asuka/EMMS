import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

Vue.component('LineChart', {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
