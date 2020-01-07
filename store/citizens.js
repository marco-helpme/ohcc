// import { getData } from '@/utils/store-utils'
export const state = () => ({
  citizens: []
})
export const mutations = {
  SET_CITIZEN (state, citizen) {
    state.citizens = citizen
  },
  ADD_CITIZEN (state, citizen) {
    state.citizens = state.citizens.concat(citizen)
  },
  DELETE_CITIZEN (state, citizenId) {
    state.citizens = state.citizens.filter(v => v.id !== citizenId)
  },
  EDIT_CITIZEN (state, citizen) {
    state.citizens = state.citizens.find(v => v.id === citizen.id)
  }
}
export const actions = {
  async  loadCitizens ({ commit, dispatch }) {
    const response = await this.$axios.get('/ciudadanos/data-join')
    const citizens = response.data.data
    commit('SET_CITIZEN', citizens)
  },
  async  createCitizen ({ commit }, citizen) {
    try {
      await this.$axios.post('/ciudadanos/crear-usuario', citizen)
      const savedCitizen = citizen
      commit('ADD_CITIZEN', citizen)
      console.log(citizen)
      return savedCitizen
    } catch (e) {
      console.log(e.response.data)
      alert(e.response.data.message)
    }
  },
  async  deleteCitizen ({ commit }, citizen) {
    const response = await this.$axios.delete(`/ciudadanos/borrar/${citizen.id}`, citizen)
    if (response.status === 200 || response.status === 204) {
      commit('DELETE_CITIZEN', citizen.id)
    }
  },
  async  editCitizen ({ commit }, citizen) {
    const response = await this.$axios.put(`/ciudadanos/actualizar/${citizen.id}`, citizen)
    const newCitizen = response.data.data.attributes
    commit('EDIT_CITIZEN', newCitizen)
    return newCitizen
  }
}
export const getters = {
  get: state => (id) => {
    return state.citizens.find(v => v.id === id) || {}
  }
}
