
export const state = () => ({
  cargos: [],
  message: '',
  error: Boolean
})
export const mutations = {
  SET_CARGOS_MUTATION (state, cargos) {
    state.cargos = cargos
  },
  SET_MESSAGE_MUTATION (state, message) {
    state.message = message
  },
  SET_ERROR_MUTATION (state, error) {
    state.error = error
  },
  ADD_CARGO_MUTATION (state, payload) {
    state.cargos.data = state.cargos.data.concat(payload.data)
  },
  EDIT_CARGO_MUTATION (state, payload) {
    state.cargos = [
      ...state.cargos.map(item =>
        item.id_cargo !== payload.id_cargo ? item : { ...item, ...payload })
    ]
  },
  DELETE_CARGO_MUTATION (state, payload) {
    state.cargos.data = state.cargos.data.filter(v => v.id_cargo !== payload.id_cargo)
  }
}
export const actions = {
  async cargarCargos ({ commit }) {
    const response = await this.$axios.get('/cargos')
    commit('SET_CARGOS_MUTATION', response.data)
  },
  async crearCargo ({ commit }, cargo) {
    const response = await this.$axios.post('/cargo/crear', cargo)
    const payload = response.data
    debugger
    commit('ADD_CARGO_MUTATION', payload)
    return payload
  },
  async editarCargo ({ commit }, cargo) {
    const response = await this.$axios.put(`/cargo/actualizar/${cargo.id_cargo}`, cargo)
    const payload = response.data
    commit('EDIT_CARGO_MUTATION', payload)
    return payload
  },
  async eliminarCargo ({ commit }, payload) {
    const response = await this.$axios.delete(`/cargo/borrar/${payload.id_cargo}`, payload)
    if (response.status === 200 || response.status === 204) {
      commit('DELETE_CARGO_MUTATION', payload)
      const cargoELiminado = response.data
      return cargoELiminado
    }
  }
}
