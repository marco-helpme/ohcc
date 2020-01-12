import {
  ADD_SPECIALISTS_MUTATIONS, createSpecialist,
  DELETE_SPECIALISTS_MUTATIONS, deleteSpecialist,
  EDIT_SPECIALISTS_MUTATIONS, editSpecialist,
  loadSpecialist,
  loadSpecialists, loadSpecialistUser,
  loadSpecialistUserData,
  SET_SPECIALISTA_MUTATION,
  SET_SPECIALISTS_MUTATIONS,
  SET_SPECIALISTS_USER_DATA_MUTATION,
  SET_SPECIALISTS_USER_MUTATION
} from '~/utils/mutation-type'

export const state = () => ({
  specialists: [],
  specialist: [],
  specialistUserData: [],
  specialistUser: []
})

export const mutations = {
  [SET_SPECIALISTS_MUTATIONS] (state, specialists) {
    state.specialists = specialists
  },
  [SET_SPECIALISTA_MUTATION] (state, specialista) {
    state.specialist = specialista
  },
  [SET_SPECIALISTS_USER_DATA_MUTATION] (state, specialistUserData) {
    state.specialistUserData = specialistUserData
  },
  [SET_SPECIALISTS_USER_MUTATION] (state, specialistUser) {
    state.specialistUser = specialistUser
  },
  [ADD_SPECIALISTS_MUTATIONS] (state, specialist) {
    state.specialists = state.specialists.concat(specialist)
  },
  [EDIT_SPECIALISTS_MUTATIONS] (state, payload) {
    state.specialists = [
      ...state.specialists.map(item =>
        item.id_usuario !== payload.id_usuario ? item : { ...item, ...payload })
    ]
  },
  [DELETE_SPECIALISTS_MUTATIONS] (state, specialistId) {
    state.specialists = state.specialists.filter(v => v.id_usuario !== specialistId)
  }
}

export const actions = {
  async [loadSpecialists] (commit) {
    const response = await this.$axios.get('/especialistas')
    const specialists = response.data.data
    commit('SET_SPECIALISTS_MUTATION', specialists)
  },
  async [loadSpecialist] (commit, specialistId) {
    const response = await this.$axios.get(`/especialista/${specialistId}`, specialistId)
    const specialist = response.data.data
    commit('SET_SPECIALISTA_MUTATION', specialist)
  },
  async [loadSpecialistUserData] (commit, specialistId) {
    const response = await this.$axios.get(`/especialistas/data-usuario/${specialistId}`, specialistId)
    const specialistuserData = response.data.data
    commit('SET_SPECIALISTS_USER_DATA_MUTATION', specialistuserData)
  },
  async [loadSpecialistUser] (commit, specialistId) {
    const response = await this.$axios.get(`/especialistas/data-join/${specialistId}`, specialistId)
    const specialistUser = response.data.data
    commit('SET_SPECIALISTS_USER_MUTATION', specialistUser)
  },
  async [createSpecialist] (commit, specialist) {
    const response = await this.$axios.post('/directivos/crear-usuario', specialist)
    const savedSpecialist = response.data.data
    commit('ADD_SPECIALISTS_MUTATION', savedSpecialist)
    return savedSpecialist
  },
  async [editSpecialist] (commit, specialist) {
    try {
      const response = await this.$axios.put(`directivos/actualizar/${specialist.id_usuario}`, specialist)
      const newExecutive = response.data
      commit('EDIT_SPECIALISTS_MUTATION', specialist)
      return newExecutive
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async [deleteSpecialist] (commit, specialist) {
    try {
      const response = await this.$axios.delete(`/directivos/borrar/${specialist.id_usuario}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_SPECIALISTS_MUTATION', specialist.id_usuario)
        alert('Directivo eliminado con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }
}
