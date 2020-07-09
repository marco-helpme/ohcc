
export const state = () => ({
  local: []
})
export const mutations = {
  SET_TIPO_LOCAL_MUTATION (state, payload) {
    state.local = payload
  },
  ADD_TIPO_LOCAL_MUTATION (state, payload) {
    state.local = state.local.concat(payload)
  },
  EDIT_TIPO_LOCAL_MUTATION (state, payload) {
    state.local = [
      ...state.local.map(item =>
        item.id_cargo !== payload.id_cargo ? item : { ...item, ...payload })
    ]
  },
  DELETE_TIPO_LOCAL_MUTATION (state, id) {
    state.local = state.local.filter(v => v.id_cargo !== id)
  }
}
export const actions = {
  async cargarLocal ({ commit }) {
    const response = await this.$axios.get('/tipo_local')
    const payload = response.data
    commit('SET_TIPO_LOCAL_MUTATION', payload)
  },
  async crearLocal ({ commit }, local) {
    const response = await this.$axios.post('/tipo_local/crear', local)
    const payload = response.data
    commit('ADD_TIPO_LOCAL_MUTATION', payload)
    return payload
  },
  async editarLocal ({ commit }, local) {
    const response = await this.$axios.put(`/tipo_local/actualizar/${local.id_local}`, local)
    const payload = response.data
    commit('EDIT_TIPO_LOCAL_MUTATION', payload)
    return payload
  },
  async eliminarLocal ({ commit }, local) {
    try {
      const response = await this.$axios.delete(`/tipo_local/borrar/${local.id_local}`, local)
      const cargo = response.data
      commit('DELETE_TIPO_LOCAL_MUTATION', cargo)
    } catch (e) {
      console.log(e.message)
    }
  }
}
