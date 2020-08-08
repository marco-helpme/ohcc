
export const state = () => ({
  drawer: false
})
export const mutations = {
  SET_DRAWER_MUTATION (state, payload) {
    state.drawer = payload
  }
}
export const actions = {
  activar_drawer ({ commit }, payload) {
    commit('SET_DRAWER_MUTATION', payload)
  }
}
