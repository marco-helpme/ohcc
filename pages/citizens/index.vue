<template>
  <div>
    <h1>lista de los ciudadanos</h1>
    <citizen-table-component
      :citizens="citizens"
      :headers="headers"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CitizenTableComponent from '../../components/CitizenTableComponent'
export default {
  name: 'Index',
  components: {
    CitizenTableComponent
  },
  computed: {
    ...mapState('citizens', [
      'citizens'
    ]),
    // ...mapActions('citizens', [
    //   'loadCitizens'
    // ]),
    headers () {
      return [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Usuario', value: 'nombre_usuario' },
        { text: 'Primer Apellido', value: 'apellido_1' },
        { text: 'Segundo Apellido', value: 'apellido_2' },
        { text: 'CI', value: 'ci' },
        { text: 'Dirección Particular', value: 'dir_particular' },
        { text: 'Teléfono', value: 'telef' },
        { text: 'Correo Electrónico', value: 'email' },
        { text: 'Tipo de Ciudadano', value: 'id_tipo_ciudadano' },
        { text: 'Contraseña', value: 'password' },
        { text: 'Acciones', value: 'actions', sortable: false, width: '300px' }
      ]
    }
  },
  methods: {
    ...mapActions('citizens', [
      'createCitizen',
      'deleteCitizen',
      'editCitizen'
    ])
  }
  // async asyncData ({ $axios, store }) {
  //   const response = await $axios.get('/ciudadanos/data-join')
  //   const citizens = response.data.data
  //   store.commit('citizens/SET_CITIZEN', citizens)
  // }
}
</script>

<style scoped>

</style>
