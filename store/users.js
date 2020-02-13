import { getData } from '@/utils/store-utils'
import {
  ADD_USER_MUTATION,
  createUser, DELETE_USER_MUTATION,
  deleteUser, EDIT_USER_MUTATION,
  editUser,
  login,
  loadUsers,
  SET_USERS_MUTATION, LOGIN_USER_MUTATION
} from '~/utils/mutation-type'

export const state = () => ({
  users: [],
  user: []
})

export const mutations = {
  [SET_USERS_MUTATION] (state, users) {
    state.users = users
  },
  [ADD_USER_MUTATION] (state, user) {
    state.users = state.users.concat(user)
  },
  [DELETE_USER_MUTATION] (state, userId) {
    state.users = state.users.filter(v => v.id_usuario !== userId)
  },
  [EDIT_USER_MUTATION] (state, payload) {
    state.users = [
      ...state.users.map(item =>
        item.id_usuario !== payload.id_usuario ? item : { ...item, ...payload })
    ]
  },
  [LOGIN_USER_MUTATION] (state, payload) {
    state.user = payload
  }
}

export const actions = {
  async [loadUsers] ({ commit, dispatch }) {
    const { data: users } = await getData('/usuarios', this.$axios)
    commit('SET_USERS_MUTATION', users)
  },
  async [createUser] ({ commit }, user) {
    const response = await this.$axios.post('/usuarios/crear', user)
    const saveduser = response.data.data
    commit('ADD_USER_MUTATION', saveduser)
    return saveduser
  },
  async [deleteUser] ({ commit }, user) {
    try {
      const response = await this.$axios.delete(`/usuarios/borrar/${user.id_usuario}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_USER_MUTATION', user.id_usuario)
        alert('Usuario eliminado con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async [editUser] ({ commit }, user) {
    try {
      const response = await this.$axios.put(`usuarios/actualizar/${user.id_usuario}`, user)
      const newuser = response.data
      commit('EDIT_USER_MUTATION', user)
      return newuser
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async [login] ({ commit }, user) {
    try {
      const response = await this.$axios.post(`usuarios/login`, user)
      const payload = response.data.data
      commit('LOGIN_USER_MUTATION', payload)
      return payload
    } catch (e) {
      console.log(e.response.data)
    }
  }
}

export const getters = {
  get: state => (id) => {
    return state.users.find(v => v.id === id) || {}
  }
}
