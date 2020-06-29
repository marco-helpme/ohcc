import { getData } from '@/utils/store-utils'
import {
  ADD_USER_MUTATION,
  createUser,
  DELETE_USER_MUTATION,
  deleteUser,
  EDIT_USER_MUTATION,
  editUser,
  login,
  loadUsers,
  SET_USERS_MUTATION,
  LOGIN_USER_MUTATION,
  SET_USER_BY_ID_MUTATION,
  setuserbyid,
  SET_MESSAGE_LOGIN_MUTATION,
  LOGOUT_MUTATION, logout, signup, SIGNUP_MUTATION
} from '~/utils/mutation-type'

export const state = () => ({
  users: [],
  user: {},
  message: [],
  error: ''
})

export const mutations = {
  [SET_USERS_MUTATION] (state, users) {
    state.users = users
  },
  [ SET_USER_BY_ID_MUTATION ] (state, payload) {
    state.user = payload
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
  },
  [SET_MESSAGE_LOGIN_MUTATION] (state, payload) {
    state.message = payload
  },
  [LOGOUT_MUTATION] (state) {
    state.user = null
  },
  [SIGNUP_MUTATION] (state, user) {
    state.user = user
  },
  SET_ERROR_MESSAGE_MUTATION (state, error) {
    state.error = error
  }
}

export const actions = {
  async [loadUsers] ({ commit, dispatch }) {
    const { data: users } = await getData('/usuarios', this.$axios)
    commit('SET_USERS_MUTATION', users)
  },
  [logout] ({ commit }) {
    commit('LOGOUT_MUTATION')
  },
  async [createUser] ({ commit }, user) {
    const response = await this.$axios.post('/usuarios/crear', user)
    const saveduser = response.data.data
    commit('ADD_USER_MUTATION', saveduser)
    return saveduser
  },
  async [signup] ({ commit }, citizen) {
    try {
      const response = await this.$axios.post(`/ciudadanos/crear-usuario`, citizen)
      const savedCitizen = response.data.data_usuario
      commit('SIGNUP_MUTATION', savedCitizen)
      console.log(savedCitizen)
      return savedCitizen
    } catch (e) {
      console.log(e)
    }
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
      const payload = response.data
      commit('LOGIN_USER_MUTATION', payload.data)
      commit('SET_MESSAGE_LOGIN_MUTATION', payload.message)
      localStorage.setItem('user_id', payload.data.id_usuario)
      console.log(response)
      return payload
    } catch (e) {
      console.log(e.response.data.message)
    }
  },
  async [setuserbyid] ({ commit }, id) {
    try {
      const response = await this.$axios.get(`usuario/${id}`, id)
      const payload = response.data.data
      commit('SET_USER_BY_ID_MUTATION', payload)
      return payload
    } catch (e) {
      console.log(e.response.data)
    }
  }
}

export const getters = {
  getname: state => (id) => {
    return state.users.find(v => v.id === id) || {}
  }
}
