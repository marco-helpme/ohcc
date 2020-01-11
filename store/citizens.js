// import { getData } from '@/utils/store-utils'
import {
  ADD_CITIZEN_MUTATION,
  createCitizen, DELETE_CITIZEN_MUTATION,
  deleteCitizen, EDIT_CITIZEN_MUTATION,
  editCitizen, loadCitizen,
  loadCitizens, loadSpecialist, SET_CITIZEN_MUTATION,
  SET_CITIZENS_MUTATION, SET_SPECIALIST_MUTATION
} from '~/utils/mutation-type'

export const state = () => ({
  citizens: [],
  citizen: [],
  specialists: []
})
export const mutations = {
  [ SET_CITIZENS_MUTATION ] (state, citizen) {
    state.citizens = citizen
  },
  [ SET_CITIZEN_MUTATION ] (state, citizen) {
    state.citizen = citizen
  },
  [ SET_SPECIALIST_MUTATION ] (state, specialists) {
    state.specialists = specialists
  },
  [ADD_CITIZEN_MUTATION] (state, citizen) {
    state.citizens = state.citizens.concat(citizen)
  },
  [DELETE_CITIZEN_MUTATION] (state, citizenId) {
    state.citizens = state.citizens.filter(v => v.id_usuario !== citizenId)
  },
  [EDIT_CITIZEN_MUTATION] (state, citizen) {
    state.citizens = state.citizens.find(v => v.id_usuario === citizen.usuario)
  }
}
export const actions = {
  /**
   * Obtener todos los ciudadanos-join
   */
  async  [loadCitizens] ({ commit, dispatch }) {
    const response = await this.$axios.get('/ciudadanos/data-join')
    const citizens = response.data.data
    commit('SET_CITIZENS_MUTATION', citizens)
  },
  /**
   * Agregar Usuario + Ciudadano
   */
  async  [ createCitizen ] ({ commit }, citizen) {
    try {
      await this.$axios.post('/ciudadanos/crear-usuario', citizen)
      const savedCitizen = citizen
      commit('ADD_CITIZEN_MUTATION', citizen)
      console.log(citizen)
      return savedCitizen
    } catch (e) {
      console.log(e.response.data)
      alert(e.response.data.message)
    }
  },
  /**
   * Borrar usuario + ciudadano
   */
  async  [ deleteCitizen ] ({ commit }, citizen) {
    const response = await this.$axios.delete(`/ciudadanos/borrar/${citizen.id}`, citizen)
    if (response.status === 200 || response.status === 204) {
      commit('DELETE_CITIZEN_MUTATION', citizen.id)
    }
  },
  /**
   * Actualizar Ciudadano by id
   */
  async  [editCitizen] ({ commit }, citizen) {
    const response = await this.$axios.put(`/ciudadanos/actualizar/${citizen.id_usuario}`, citizen)
    const newCitizen = response.data.data.attributes
    commit('EDIT_CITIZEN_MUTATION', newCitizen)
    return newCitizen
  },
  /**
   * Obtener un solo ciudadano por id_usuario ciudadano/{id} id_usuario
   */
  async  [loadCitizen] ({ commit }, citizen) {
    const response = await this.$axios.get(`/ciudadano/${citizen.id_usuario}`, citizen)
    const newCitizen = response.data.data
    commit('SET_CITIZEN_MUTATION', newCitizen)
  },
  /**
   * Obtener todos los especialistas (datos del usuario)
   */
  async  [loadSpecialist] ({ commit }) {
    const response = await this.$axios.get(`/ciudadanos/data-usuario}`)
    const Specialists = response.data.data
    commit('SET_SPECIALIST_MUTATION', Specialists)
  }
}
export const getters = {
  get: state => (id) => {
    return state.citizens.find(v => v.id_usuario === id) || {}
  }
}
