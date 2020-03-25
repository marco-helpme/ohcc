<template>
  <complainsist-component />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ComplainsistComponent from '../../components/specialists/complainsistComponent'
export default {
  name: 'Complains',
  components: { ComplainsistComponent },
  data: () => ({
    username: [],
    headers: [
      { text: 'Nombre de Usuario',
        align: 'left',
        sortable: false,
        value: 'id_usuario' },
      { text: 'Descripcion', align: 'center', value: 'descripcion' },
      { text: 'ations', value: 'actions' }

    ],
    requests: [],
    defaultitems: {
      id_solicitud: 49,
      evaluacion: -1,
      respuesta: null,
      fecha_creada: '2020-02-23',
      fecha_iniciada: null,
      fecha_respuesta: null,
      descripcion: 'no me gustan sus servicios',
      id_usuario: 79,
      id_especialista: 1,
      id_tipo_solicitud: 5,
      id_estado: 1
    },
    editeditems: {
      id_solicitud: 49,
      evaluacion: -1,
      respuesta: null,
      fecha_creada: '2020-02-23',
      fecha_iniciada: null,
      fecha_respuesta: null,
      descripcion: 'no me gustan sus servicios',
      id_usuario: 79,
      id_especialista: 1,
      id_tipo_solicitud: 5,
      id_estado: 1
    }
  }),
  computed: {
    ...mapState('suggestions', [
      'requests_complains'
    ])
  },
  methods: {
    ...mapActions('suggestions', [
      'loadRequestComplains'
    ]),
    ...mapActions('users', [
      'getuserbyid'
    ])
  }
}
</script>

<style scoped>

</style>
