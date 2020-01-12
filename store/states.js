import { loadStates, SET_STATES_MUTATION } from '~/utils/mutation-type'

export const state = () => ({
  states: []
})
export const mutations = {
  [SET_STATES_MUTATION] (state, states) {
    state.states = states
  }
}
export const actions = {
  async [loadStates] ({ commit }) {
    const response = await this.$axios.get('/estados')
    const states = response.data.data
    commit('SET_STATES_MUTATION', states)
  }
}
