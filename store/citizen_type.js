import { loadCitizensType, SET_CITIZENS_TYPE_MUTATION } from '~/utils/mutation-type'

export const state = () => ({
  citizensType: []
})
export const mutations = {
  [SET_CITIZENS_TYPE_MUTATION] (state, citizensType) {
    state.citizensType = citizensType
  }
}
export const actions = {
  async [loadCitizensType] ({ commit }) {
    const response = await this.$axios.get('/tipos-ciudadanos')
    const citizensType = response.data.data
    commit('SET_CITIZENS_TYPE_MUTATION', citizensType)
  }
}
