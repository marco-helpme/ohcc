import { getData } from '@/utils/store-utils'

export const state = () => ({
  users: []
})

export const mutations = {
  SET_USERS (state, users) {
    state.users = users
  },
  ADD_USER (state, user) {
    state.users = state.users.concat(user)
  },
  DELETE_USER (state, userId) {
    state.users = state.users.filter(v => v.id_usuario !== userId)
  },
  EDIT_USER (state, payload) {
    // const index = state.users.findIndex(v => v.id_usuario !== user.id_usuario)
    // state.users[index] = user
    //
    // const v = state.users.find(v => v.id_usuario !== user.id_usuario)
    // state.users[v] = user
    // console.log(state.users[v])
    //
    // state.users = state.users.map((user) => {
    //   if (user.id_usuario === payload.id_usuario) {
    //     return Object.assign({}, user, payload.data)
    //   }
    //   return user
    // })
    //
    state.users = [
      ...state.users.map(item =>
        item.id_usuario !== payload.id_usuario ? item : { ...item, ...payload })
    ]
  }
}

export const actions = {
  async loadUsers ({ commit, dispatch }) {
    const { data: users } = await getData('/usuarios', this.$axios)
    commit('SET_USERS', users)
  },
  async createUser ({ commit }, user) {
    const response = await this.$axios.post('/usuarios/crear', user)
    const saveduser = response.data.data
    commit('ADD_USER', saveduser)
    return saveduser
  },
  async deleteUser ({ commit }, user) {
    try {
      const response = await this.$axios.delete(`/usuarios/borrar/${user.id_usuario}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_USER', user.id_usuario)
        alert('Usuario eliminado con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async editUser ({ commit }, user) {
    try {
      const response = await this.$axios.put(`usuarios/actualizar/${user.id_usuario}`, user)
      const newuser = response.data
      commit('EDIT_USER', user)
      return newuser
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
