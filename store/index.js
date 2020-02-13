export const actions = {
  // esta función se ejecuta antes de iniciar la app, y cargará
  // todo el contenido de la api
  async nuxtServerInit ({ dispatch }) {
    await dispatch('executives/loadExecutives')
    await dispatch('executives/loadExecutivesUsers')
    await dispatch('users/loadUsers')
    await dispatch('citizens/loadCitizens')
    await dispatch('suggestions/loadRequests')
    await dispatch('states/loadStates')
    await dispatch('citizen_type/loadCitizensType')
    await dispatch('request_type/loadRequestType')
  }
}
