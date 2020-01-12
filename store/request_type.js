import { loadRequestType, SET_REQUEST_TYPE_MUTATION } from '~/utils/mutation-type'

export const state = () => ({
  requestType: []
})
export const mutations = {
  [SET_REQUEST_TYPE_MUTATION] (state, requestType) {
    state.requestType = requestType
  }
}
export const actions = {
  async [loadRequestType] ({ commit }) {
    const response = await this.$axios.get('tipos-solicitud')
    const requestType = response.data.data
    commit('SET_REQUEST_TYPE_MUTATION', requestType)
  }
}
