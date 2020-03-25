export const state = () => ({
  totalSolicitudes: 0,
  especialistas: [],
  cantidadRespondida: 0,
  nombreCantidad: [],
  nombreEvalucaion: [],
  cantidadEvaluada: [],
  tipoSolicitudCantidad: []
})
export const mutations = {
  SET_TOTALSOLICITUDES_MUTATION (state, totalSOlicitudes) {
    state.totalSolicitudes = totalSOlicitudes
  },
  SET_ESPECIALISTAS_MUTATION (state, especialistas) {
    state.especialistas = especialistas
  },
  SET_CANTIDADRESPONDIDA_MUTATION (state, cantidadRespondida) {
    state.cantidadRespondida = cantidadRespondida
  },
  SET_NOMBRECANTIDAD_MUTATION (state, nombreCantidad) {
    state.nombreCantidad = nombreCantidad
  },
  SET_NOMBREEVALUACION_MUTATION (state, nombreEvalucaion) {
    state.nombreEvalucaion = nombreEvalucaion
  },
  SET_CANTIDADEVALUADA_MUTATION (state, cantidadEvaluada) {
    state.cantidadEvaluada = cantidadEvaluada
  },
  SET_TIPOSOLICITUDCANTIDAD_MUTATION (state, tipoSolicitudCantidad) {
    state.tipoSolicitudCantidad = tipoSolicitudCantidad
  }
}
export const actions = {
  async loadtotalAndEspecialistas ({ commit }) {
    const response = await this.$axios.get(`graficoespcialistasrespuestas`)
    const totalSOlicitudes = response.data.total
    commit('SET_TOTALSOLICITUDES_MUTATION', totalSOlicitudes)
  },
  async loadEspecialistas ({ commit }) {
    const response = await this.$axios.get(`graficoespcialistasrespuestas`)
    const especialistas = response.data.data
    console.log(especialistas)
    commit('SET_ESPECIALISTAS_MUTATION', especialistas)
  },
  async loadCantidadRespondida ({ commit }) {
    const response = await this.$axios.get(`graficoespcialistasrespuestas`)
    const cantidadRespondida = response.data.cantidadRespondida
    console.log(cantidadRespondida)
    commit('SET_CANTIDADRESPONDIDA_MUTATION', cantidadRespondida)
  },
  async loadNombreCantidad ({ commit }) {
    const response = await this.$axios.get(`graficoespcialistasrespuestas`)
    const nombreCantidad = response.data.nombreCantidad
    console.log(nombreCantidad)
    commit('SET_NOMBRECANTIDAD_MUTATION', nombreCantidad)
  },
  async loadNombreEvaluacion ({ commit }) {
    const response = await this.$axios.get(`especialistas/evaluaciones`)
    const nombreEvalucaion = response.data.nombreEvalucaion
    console.log(nombreEvalucaion)
    commit('SET_NOMBREEVALUACION_MUTATION', nombreEvalucaion)
  },
  async loadCantidadEvaluada ({ commit }) {
    const response = await this.$axios.get(`especialistas/evaluaciones`)
    const cantidadEvaluada = response.data.cantidadEvaluada
    console.log(cantidadEvaluada)
    commit('SET_CANTIDADEVALUADA_MUTATION', cantidadEvaluada)
  },
  async loadTipoSolicitudCantidad ({ commit }) {
    const response = await this.$axios.get(`grafico/solicitudes/tipo`)
    const tipoSolicitudCantidad = response.data.data
    console.log(tipoSolicitudCantidad)
    commit('SET_TIPOSOLICITUDCANTIDAD_MUTATION', tipoSolicitudCantidad)
  }
}
