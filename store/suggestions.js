import {
  ADD_REQUEST_MUTATION,
  createRequest,
  DELETE_REQUEST_MUTATION,
  deleteRequest,
  EDIT_REQUEST_MUTATION,
  editSuggestion,
  getCompletedRequest,
  getRequestBySpecialist, loadRequestComplains,
  loadRequests,
  loadRquestById,
  loadRquestType,
  loadRquestUser,
  SET_REQUEST_MUTATION, SET_REQUESTS_COMPLAINS_MUTATION,
  SET_REQUESTS_FINISHED_MUTATION,
  SET_REQUESTS_MUTATION,
  SET_REQUESTS_SPECIALIST_MUTATION,
  SET_REQUESTS_TYPE_MUTATION,
  SET_REQUESTS_USER_MUTATION,
  specialistAnswer, specialistRequestBegin,
  updateDescriptionUser,
  updateRequestTypeSpecialist,
  userCancelsRequest,
  userEvaluation
} from '~/utils/mutation-type'

export const state = () => ({
  requests: [],
  consulta: [],
  requests_user: [],
  requests_type: [],
  requests_specialist: [],
  requests_finished: [],
  requests_complains: [],
  mensaje: ''

})

export const mutations = {
  [ SET_REQUESTS_MUTATION ] (state, requests) {
    state.requests = requests
  },
  [ SET_REQUESTS_COMPLAINS_MUTATION ] (state, requests) {
    state.requests_complains = requests
  },
  [ SET_REQUEST_MUTATION ] (state, request) {
    state.request = request
  },
  [ SET_REQUESTS_USER_MUTATION ] (state, request) {
    state.requests_user = request
  },
  [ SET_REQUESTS_TYPE_MUTATION ] (state, request) {
    state.requests_type = request
  },
  [ SET_REQUESTS_SPECIALIST_MUTATION ] (state, request) {
    state.requests_specialist = request
  },
  [ SET_REQUESTS_FINISHED_MUTATION ] (state, request) {
    state.requests_finished = request
  },
  [ ADD_REQUEST_MUTATION ] (state, suggestion) {
    state.consulta = suggestion
  },
  [ DELETE_REQUEST_MUTATION ] (state, requestId) {
    state.requests = state.requests.filter(v => v.id_solicitud !== requestId)
  },
  SET_MENSAJE (state, mensaje) {
    state.mensaje = mensaje
  },
  [ EDIT_REQUEST_MUTATION ] (state, payload) {
    state.requests = [
      ...state.requests.map(item =>
        item.id_tipo_solicitud !== payload.id_tipo_solicitud ? item : { ...item, ...payload })
    ]
  }
}

export const actions = {
  // Obtener todas las solicitudes
  async [ loadRequests ] ({ commit }) {
    const response = await this.$axios.get('/solicitudes')
    const requests = response.data.data
    commit('SET_REQUESTS_MUTATION', requests)
  },
  // Obtener una solicitud por id
  async [loadRquestById] ({ commit }, requestId) {
    const response = await this.$axios.get(`/solicitud/${requestId}`, requestId)
    const request = response.data.data
    commit('SET_REQUEST_MUTATION', request)
  },
  // OBTENER LAS QUEJAS
  async [loadRequestComplains] ({ commit }) {
    try {
      const response = await this.$axios.get(`/solicitudes/tipo/5`)
      const request = response.data.data
      commit('SET_REQUESTS_COMPLAINS_MUTATION', request)
      console.log(request)
    } catch (e) {
      console.log(e.data.message)
    }
  },
  // chequear esta funcion
  // Obtener todas las solicitudes de un usuario
  async [loadRquestUser] ({ commit }, request) {
    try {
      request.id_usuario = localStorage.getItem('user_id')
      const response = await this.$axios.post(`/solicitudes/usuario-tipo`, request)
      const payload = response.data.data
      commit('SET_REQUESTS_USER_MUTATION', payload)
      return payload
    } catch (e) {
      return e
    }
  },
  // Obtener todas las solicitudes X tipo
  async [loadRquestType] ({ commit }, id) {
    const response = await this.$axios.get(`solicitudes/tipo/${id}`, id)
    const payload = response.data.data
    commit('SET_REQUESTS_SPECIALIST_MUTATION', payload)
  },
  // Agregar una Solicitud creada por el usuario
  async [createRequest] ({ commit }, request) {
    try {
      const response = await this.$axios.post('/solicitudes/crear', request)
      const savedRequest = response.data
      commit('ADD_REQUEST_MUTATION', savedRequest)
      return savedRequest
    } catch (e) {
      const message = 'Se ha perdido la conexión con el servidor, intente en un momento'
      const savedRequest = {}
      savedRequest.message = message
      savedRequest.error = true
      commit('ADD_REQUEST_MUTATION', savedRequest)
    }
  },
  async [deleteRequest] ({ commit }, request) {
    try {
      const response = await this.$axios.delete(`/solicitudes/borrar/${request.id_solicitud}`, request)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_REQUEST_MUTATION', request.id_solicitud)
        commit('SET_MENSAJE', response.data.message)
        return response.data
      }
    } catch (e) {
      const message = 'Se ha perdido la conexión con el servidor, intente en un momento'
      const savedRequest = {}
      savedRequest.message = message
      savedRequest.error = true
      commit('ADD_REQUEST_MUTATION', savedRequest)
    }
  },
  // no sirve no se edita asi
  async [editSuggestion] ({ commit }, request) {
    try {
      const response = await this.$axios.put(`usuarios/actualizar/${request.id_solicitud}`, request)
      const newRequest = response.data
      commit('EDIT_REQUEST_MUTATION', request)
      return newRequest
    } catch (e) {
      console.log(e.response.data)
    }
  },
  // Especialista recepciona solicitud y la pone en marcha
  async [specialistRequestBegin] ({ commit }, request) {
    request.id_especialista = localStorage.getItem('user_id')
    const response = await this.$axios.put(`solicitudes/especialista-recibe/${request.id_solicitud}`, request)
    const payload = response.data
    commit('EDIT_REQUEST_MUTATION', payload)
    return payload
  },
  // Especialista da respuesta y cambia el estado de la solicitud
  async [specialistAnswer] ({ commit }, request) {
    const idEspecialista = localStorage.getItem('user_id')
    request.id_especialista = idEspecialista
    const response = await this.$axios.put(`solicitudes/especialista-set-respuesta/${request.id_solicitud}`, request)
    const payload = response.data
    commit('EDIT_REQUEST_MUTATION', payload)
    return payload
  },
  // evaluacion por usuario
  async [userEvaluation] ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/ciudadano-set-evaluacion/${request.id_solicitud}`, request)
    const payload = response.data
    commit('EDIT_REQUEST_MUTATION', payload)
    return payload
  },
  // Actualizar descripcion por usuario
  async [updateDescriptionUser] ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/ciudadano-set-descripcion/${request.id_solicitud}`, request)
    const payload = response.data
    commit('EDIT_REQUEST_MUTATION', payload)
    return payload
  },
  // Actualizar tipo de solicitud en tabla solicitud por el especialista
  // Update request type in table request by specialist
  async [updateRequestTypeSpecialist] ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/especialista-set-tipo/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST_MUTATION', payload)
    return payload
  },
  // Obtener solucitudes por el especialista
  // Get request by specialist
  async [getRequestBySpecialist] ({ commit }, request) {
    request.id_especialista = localStorage.getItem('user_id')
    const response = await this.$axios.post(`solicitud/${request.id}`, request)
    const payload = response.data
    console.log(payload)
    commit('SET_REQUESTS_SPECIALIST_MUTATION', payload)
  },
  // Obtener todas las solicitudes finalizadas
  // Get completed requests
  async [getCompletedRequest] ({ commit }, request) {
    const response = await this.$axios.get(`solicitudes/finalizadas/${request.id_tipo_solicitud}`, request)
    const payload = response.data.data
    commit('SET_REQUEST_SPECIALIST_MUTATION', payload)
  },
  // Actualizar usuario cancela la solicitud
  // user cancels request
  async [userCancelsRequest] ({ commit }, request) {
    const response = await this.$axios.put(`solicitudes/cancelar/${request.id_solicitud}`, request)
    const payload = response.data.data
    commit('EDIT_REQUEST_MUTATION', payload)
    return payload
  }
}
export const getters = {}
