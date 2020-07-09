import { loadCitizensType, SET_CITIZENS_TYPE_MUTATION } from '~/utils/mutation-type'

export const state = () => ({
  citizensType: []
})
export const mutations = {
  [SET_CITIZENS_TYPE_MUTATION] (state, citizensType) {
    state.citizensType = citizensType
  },
  ADD_TIPO_CIUDADANO_MUTATION (state, payload) {
    state.citizensType = payload
  },
  EDIT_TIPO_CIUDADANO_MUTATION (state, payload) {
    state.citizensType = [
      ...state.citizensType.map(item =>
        item.id_tipo_ciudadano !== payload.id_tipo_ciudadano ? item : { ...item, ...payload })
    ]
  },
  DELETE_TIPO_CIUDADANO_MUTATION (state, id) {
    state.citizensType = state.citizensType.filter(v => v.id_tipo_ciudadano !== id)
  }
}
export const actions = {
  async [loadCitizensType] ({ commit }) {
    const response = await this.$axios.get('/tipos-ciudadanos')
    const citizensType = response.data.data
    commit('SET_CITIZENS_TYPE_MUTATION', citizensType)
  },
  async crearTipoCiudadano ({ commit }, tipoCiudadano) {
    const response = await this.$axios.post('/tipos-ciudadanos/crear', tipoCiudadano)
    const payload = response.data
    commit('ADD_TIPO_CIUDADANO_MUTATION', payload)
    return payload
  },
  async editarTipoCiudadano ({ commit }, tipoCiudadano) {
    const response = await this.$axios.put(`/tipos-ciudadanos/actualizar/${tipoCiudadano.id_local}`, tipoCiudadano)
    const payload = response.data
    commit('EDIT_TIPO_CIUDADANO_MUTATION', payload)
    return payload
  },
  async eliminarTipoCiudadano ({ commit }, tipoCiudadano) {
    try {
      const response = await this.$axios.delete(`/tipos-ciudadanos/borrar/${tipoCiudadano.id_local}`, tipoCiudadano)
      const payload = response.data
      commit('DELETE_TIPO_CIUDADANO_MUTATION', payload)
    } catch (e) {
      console.log(e.message)
    }
  }
}
