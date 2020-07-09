export const strict = false
export const actions = {
  // esta función se ejecuta antes de iniciar la app, y cargará
  // todo el contenido de la api
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch('executives/loadExecutives')
      await dispatch('executives/loadExecutivesUsers')
      await dispatch('executives/loadExecutivesUserData')
      await dispatch('users/loadUsers')
      await dispatch('citizens/loadCitizens')
      await dispatch('suggestions/loadRequests')
      await dispatch('states/loadStates')
      await dispatch('specialists/loadSpecialists')
      await dispatch('specialists/loadSpecialistUserData')
      await dispatch('specialists/loadSpecialistUser')
      await dispatch('citizen_type/loadCitizensType')
      await dispatch('request_type/loadRequestType')
      await dispatch('graficos/loadtotalAndEspecialistas')
      await dispatch('graficos/loadEspecialistas')
      await dispatch('graficos/loadCantidadRespondida')
      await dispatch('graficos/loadNombreCantidad')
      await dispatch('graficos/loadNombreEvaluacion')
      await dispatch('graficos/loadCantidadEvaluada')
      await dispatch('graficos/loadTipoSolicitudCantidad')
      await dispatch('cargo/cargarCargos')
      await dispatch('tipo_local/cargarLocal')
    } catch (e) {
      dispatch('snackbar/setSnackbar', { color: 'red', text: 'No se tiene conexión con el servidor' })
    }
  }
}
