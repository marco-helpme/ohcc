import {
  ADD_SPECIALISTS_MUTATION,
  createSpecialist, DELETE_SPECIALISTS_MUTATION,
  deleteSpecialist, EDIT_SPECIALISTS_MUTATION,
  editSpecialist,
  loadSpecialist,
  loadSpecialists, loadSpecialistUser,
  loadSpecialistUserData,
  SET_SPECIALISTA_MUTATION, SET_SPECIALISTS_COMPLAINS_MUTATION,
  SET_SPECIALISTS_MUTATION,
  SET_SPECIALISTS_USER_DATA_MUTATION,
  SET_SPECIALISTS_USER_MUTATION
} from '~/utils/mutation-type'

export const state = () => ({
  specialists: [],
  specialist: [],
  specialistUserData: [],
  specialistUser: [],
  specialists_complains: []
})

export const mutations = {
  [SET_SPECIALISTS_MUTATION] (state, specialists) {
    state.specialists = specialists
  },
  [SET_SPECIALISTA_MUTATION] (state, specialista) {
    state.specialist = specialista
  },
  [SET_SPECIALISTS_USER_DATA_MUTATION] (state, specialistUserData) {
    state.specialistUserData = specialistUserData
  },
  [SET_SPECIALISTS_COMPLAINS_MUTATION] (state, payload) {
    state.specialists_complains = payload
  },
  [SET_SPECIALISTS_USER_MUTATION] (state, specialistUser) {
    state.specialistUser = specialistUser
  },
  [ADD_SPECIALISTS_MUTATION] (state, specialist) {
    state.specialistUser = state.specialists.concat(specialist)
  },
  [EDIT_SPECIALISTS_MUTATION] (state, payload) {
    state.specialists = [
      ...state.specialists.map(item =>
        item.id_usuario !== payload.id_usuario ? item : { ...item, ...payload })
    ]
  },
  [DELETE_SPECIALISTS_MUTATION] (state, specialistId) {
    state.specialists = state.specialists.filter(v => v.id_usuario !== specialistId)
  }
}

export const actions = {
  async [loadSpecialists] ({ commit }) {
    const response = await this.$axios.get('/especialistas')
    const specialists = response.data.data
    commit('SET_SPECIALISTS_MUTATION', specialists)
  },
  async [loadSpecialist] ({ commit }, specialistId) {
    const response = await this.$axios.get(`/especialista/${specialistId}`, specialistId)
    const specialist = response.data.data
    commit('SET_SPECIALISTA_MUTATION', specialist)
  },
  async [loadSpecialistUserData] ({ commit }) {
    const response = await this.$axios.get(`/especialistas/data-usuario`)
    const specialistuserData = response.data.data
    commit('SET_SPECIALISTS_USER_DATA_MUTATION', specialistuserData)
  },
  async [loadSpecialistUser] ({ commit }) {
    try {
      const response = await this.$axios.get(`/especialistas/data-join`)
      const specialistUser = response.data.data
      commit('SET_SPECIALISTS_USER_MUTATION', specialistUser)
    } catch (e) {
      console.log(e)
    }
  },
  async [createSpecialist] ({ commit }, specialist) {
    try {
      const response = await this.$axios.post('/especialistas/crear-usuario', specialist)
      const savedSpecialist = response.data.data_usuario
      commit('ADD_SPECIALISTS_MUTATION', savedSpecialist)
      return savedSpecialist
    } catch (e) {
      console.log(e)
    }
  },
  async [editSpecialist] ({ commit }, specialist) {
    try {
      const response = await this.$axios.put(`/especialistas/actualizar/${specialist.id_usuario}`, specialist)
      const newExecutive = response.data.data
      commit('EDIT_SPECIALISTS_MUTATION', specialist)
      return newExecutive
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async [deleteSpecialist] ({ commit }, specialist) {
    try {
      const response = await this.$axios.delete(`/especialistas/borrar/${specialist.id_usuario}`, specialist)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_SPECIALISTS_MUTATION', specialist.id_usuario)
        alert('Especialista eliminado con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }
}
