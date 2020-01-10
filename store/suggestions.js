export const state = () => ({
  suggestions: []
})

export const mutations = {
  SET_SUGGESTION (state, suggestion) {
    state.suggestions = suggestion
  },
  ADD_SUGGESTION (state, suggestion) {
    state.suggestions = state.suggestions.concat(suggestion)
  },
  DELETE_SUGGESTION (state, suggestionId) {
    state.suggestions = state.suggestions.filter(v => v.id_tipo_solicitud !== suggestionId)
  },
  EDIT_SUGGESTION (state, payload) {
    state.suggestions = [
      ...state.suggestions.map(item =>
        item.id_tipo_solicitud !== payload.id_tipo_solicitud ? item : { ...item, ...payload })
    ]
  }
}

export const actions = {
  async loadSuggestions ({ commit, dispatch, $axios }) {
    const response = await this.$axios.get('/solicitudes/tipo/6')
    const suggestions = response.data.data
    commit('SET_SUGGESTION', suggestions)
  },
  async createSuggestion ({ commit }, suggestion) {
    const response = await this.$axios.post('/solicitudes/crear', suggestion)
    const savedsuggestion = response.data.data
    commit('ADD_USER', savedsuggestion)
    return savedsuggestion
  },
  async deleteSuggestion ({ commit }, suggestion) {
    try {
      const response = await this.$axios.delete(`/solicitudes/borrar/${suggestion.id}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_USER', suggestion.id_usuario)
        alert('Sujerencia eliminada con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async editSuggestion ({ commit }, suggestion) {
    try {
      const response = await this.$axios.put(`usuarios/actualizar/${suggestion.id_usuario}`, suggestion)
      const newsuggestion = response.data
      commit('EDIT_USER', suggestion)
      return newsuggestion
    } catch (e) {
      console.log(e.response.data)
    }
  }
}
export const getters = {}
