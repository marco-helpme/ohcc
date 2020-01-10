export const actions = {
  // esta función se ejecuta antes de iniciar la app, y cargará
  // todo el contenido de la api
  async nuxtServerInit ({ commit }) {
    const usersAPI = await this.$axios.get('/usuarios')
    const users = usersAPI.data.data
    commit('users/SET_USERS', users)
    const citizensAPI = await this.$axios.get('/ciudadanos/data-join')
    const citizens = citizensAPI.data.data
    commit('citizens/SET_CITIZEN', citizens)
    const suggestionsAPI = await this.$axios.get('/solicitudes/tipo/6')
    const suggestions = suggestionsAPI.data.data
    commit('suggestions/SET_SUGGESTION', suggestions)
  }
}
