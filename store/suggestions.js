export const state = () => ({
  requests: [],
  request: [],
  requests_user: [],
  requests_type: [],
  requests_specialist: [],
  requests_finished: []

})

export const mutations = {
  SET_REQUESTS (state, requests) {
    state.requests = requests
  },
  SET_REQUEST (state, request) {
    state.request = request
  },
  SET_REQUESTS_USER (state, request) {
    state.requests_user = request
  },
  SET_REQUESTS_TYPE (state, request) {
    state.requests_type = request
  },
  SET_REQUEST_SPECIALIST (state, request) {
    state.requests_specialist = request
  },
  SET_REQUEST_FINISHED (state, request) {
    state.requests_finished = request
  },
  ADD_SUGGESTION (state, suggestion) {
    state.requests = state.requests.concat(suggestion)
  },
  DELETE_REQUEST (state, requestId) {
    state.requests = state.requests.filter(v => v.id_solicitud !== requestId)
  },
  EDIT_REQUEST (state, payload) {
    state.requests = [
      ...state.requests.map(item =>
        item.id_tipo_solicitud !== payload.id_tipo_solicitud ? item : { ...item, ...payload })
    ]
  }
}

export const actions = {
  // Obtener todas las solicitudes
  async loadRequests ({ commit }) {
    const response = await this.$axios.get('/solicitudes')
    const requests = response.data.data
    commit('SET_SUGGESTION', requests)
  },
  // Obtener una solicitud por id
  async loadRquest_by_id ({ commit }, requestId) {
    const response = await this.$axios.get(`/solicitud/${requestId}`, requestId)
    const request = response.data.data
    commit('SET_REQUEST', request)
  },
  // chequear esta funcion
  // Obtener todas las solicitudes de un usuario
  async loadRquest_user ({ commit }, request) {
    const response = await this.$axios.get(`solicitudes/usuario-tipo`, request)
    const payload = response.data.data
    commit('SET_REQUESTS_USER', payload)
  },
  // Obtener todas las solicitudes X tipo
  async loadRquest_type ({ commit }, request) {
    const response = await this.$axios.get(`solicitudes/tipo/${request.id_tipo_solicitud}`, request)
    const payload = response.data.data
    commit('SET_REQUESTS_TYPE', payload)
  },
  // Agregar una Solicitud creada por el usuario
  async createRequest ({ commit }, request) {
    const response = await this.$axios.post('/solicitudes/crear', request)
    const savedRequest = response.data.data
    commit('ADD_REQUEST', savedRequest)
    return savedRequest
  },
  async deleteRequest ({ commit }, request) {
    try {
      const response = await this.$axios.delete(`/solicitudes/borrar/${request.id_solicitud}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_REQUEST', request.id_solicitud)
        alert('Sujerencia eliminada con exito')
      }
    } catch (e) {
      console.log(e.response.data)
    }
  },
  async editSuggestion ({ commit }, suggestion) {
    try {
      const response = await this.$axios.put(`usuarios/actualizar/${suggestion.id_usuario}`, suggestion)
      const newsuggestion = response.data
      commit('EDIT_USER', suggestion)
      return newsuggestion
    } catch (e) {
      console.log(e.response.data)
    }
  },
  // Especialista recepciona solicitud y la pone en marcha
  async specialist_request_begin ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/especialista-recibe/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST', payload)
    return payload
  },
  // Especialista da respuesta y cambia el estado de la solicitud
  async specialist_answer ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/especialista-set-respuesta/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST', payload)
    return payload
  },
  // evaluacion por usuario
  async user_evaluation ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/ciudadano-set-evaluacion/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST', payload)
    return payload
  },
  // Actualizar descripcion por usuario
  async update_description_user ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/ciudadano-set-descripcion/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST', payload)
    return payload
  },
  // Actualizar tipo de solicitud en tabla solicitud por el especialista
  // Update request type in table request by specialist
  async update_request_type_specialist ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/especialista-set-tipo/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST', payload)
    return payload
  },
  // Obtener solucitudes por el especialista
  // Get request by specialist
  async get_request_by_specialist ({ commit }, request) {
    const response = await this.$axios.get(`solicitud/${request.id_tipo_solicitud}`, request)
    const payload = response.data.data
    commit('SET_REQUEST_SPECIALIST', payload)
  },
  // Obtener todas las solicitudes finalizadas
  // Get completed requests
  async get_completed_request ({ commit }, request) {
    const response = await this.$axios.get(`solicitudes/finalizadas/${request.id_tipo_solicitud}`, request)
    const payload = response.data.data
    commit('SET_REQUEST_SPECIALIST', payload)
  },
  // Actualizar usuario cancela la solicitud
  // user cancels request
  async user_cancels_request ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/cancelar/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST', payload)
    return payload
  }
}
export const getters = {}
