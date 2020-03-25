import {
  ADD_EXECUTIVE_MUTATION,
  createExecutive, DELETE_EXECUTIVES_MUTATION,
  deleteExecutive, EDIT_EXECUTIVES_MUTATION, editExecutive,
  loadExecutive,
  loadExecutives, loadExecutivesUserData, loadExecutivesUsers,
  SET_EXECUTIVE_MUTATION,
  SET_EXECUTIVES_MUTATION,
  SET_EXECUTIVES_USERS_DATA_MUTATION, SET_EXECUTIVES_USERS_MUTATION
} from '~/utils/mutation-type'

export const state = () => ({
  executives: [],
  executive: [],
  executiveUserData: [],
  executiveUsers: []
})
export const mutations = {
  [SET_EXECUTIVES_MUTATION] (state, executives) {
    state.executives = executives
  },
  [SET_EXECUTIVE_MUTATION] (state, executive) {
    state.executive = executive
  },
  [SET_EXECUTIVES_USERS_DATA_MUTATION] (state, executiveUserData) {
    state.executiveUserData = executiveUserData
  },
  [SET_EXECUTIVES_USERS_MUTATION] (state, executiveUsers) {
    state.executiveUsers = executiveUsers
  },
  [ADD_EXECUTIVE_MUTATION] (state, executive) {
    state.executives = state.executives.concat(executive)
  },
  [DELETE_EXECUTIVES_MUTATION] (state, executive) {
    state.executives = state.executives.filter(v => v.id_usuario !== executive.id_usuario)
  },
  [EDIT_EXECUTIVES_MUTATION] (state, payload) {
    state.executives = [
      ...state.executives.map(item =>
        item.id_usuario !== payload.id_usuario ? item : { ...item, ...payload })
    ]
  }
}
export const actions = {
  /**
   * Obtener todos los directivos
   */
  async [loadExecutives] ({ commit }) {
    const response = await this.$axios.get('/directivos')
    const executives = response.data.data
    commit('SET_EXECUTIVES_MUTATION', executives)
  },
  /**
   * Obtener un solo directivo por id_directivo
   */
  async [loadExecutive] ({ commit }, executiveId) {
    const response = await this.$axios.get(`/directivo/${executiveId}`, executiveId)
    const executive = response.data.data
    commit('SET_EXECUTIVE_MUTATION', executive)
  },
  /**
   * Obtener todos los directivos (datos del usuario)
   */
  async [loadExecutivesUserData] ({ commit }) {
    const response = await this.$axios.get('directivos/data-usuario')
    const executiveUserData = response.data.data
    commit('SET_EXECUTIVES_USERS_DATA_MUTATION', executiveUserData)
  },
  /**
   * Obtener todos los directivos-join
   */
  async [loadExecutivesUsers] ({ commit }) {
    const response = await this.$axios.get(`directivos/data-join`)
    const executiveUsers = response.data.data
    commit('SET_EXECUTIVES_USERS_MUTATION', executiveUsers)
  },
  /**
   * Agregar Usuario + Directivo
   */
  async [createExecutive] ({ commit }, executive) {
    const response = await this.$axios.post('/directivos/crear-usuario', executive)
    const savedExecutive = response.data.data_usuario
    commit('ADD_EXECUTIVE_MUTATION', savedExecutive)
    return savedExecutive
  },
  /**
   * Actualizar Directivo by id
   */
  async [editExecutive] ({ commit }, executive) {
    try {
      const response = await this.$axios.put(`directivos/actualizar/${executive.id_usuario}`, executive)
      const newExecutive = response.data
      commit('EDIT_EXECUTIVES_MUTATION', executive)
      return newExecutive
    } catch (e) {
      console.log(e.response.data)
    }
  },
  /**
   * Borrar usuario + directivo
   */
  async [deleteExecutive] ({ commit }, executive) {
    try {
      const response = await this.$axios.delete(`/directivos/borrar/${executive.id_usuario}`, executive)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_EXECUTIVES_MUTATION', executive)
        alert('Directivo eliminado con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }
}
export const getters = {
}
