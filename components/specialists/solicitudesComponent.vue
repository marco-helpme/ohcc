<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <v-select
          :items="items"
          :menu-props="{ top: true, offsetY: true }"
          v-model="solicitud"
        />
      </v-col>
    </v-row>
    <v-row
      v-for="item in requests_specialist.data"
      :key="item.id_solicitud"
    >
      <v-col>
        <v-hover
          v-slot:default="{ hover }"
          open-delay="200"
        >
          <v-card
            :elevation="hover ? 16 : 2"
            class="glossary"
            color="white"
          >
            <v-card-title>
              <v-row
                align="center"
              >
                <v-col
                  align="left"
                >
                  <span class="title font-weight-light"># {{ item.id_solicitud }}</span>
                </v-col>
              </v-row>
              <div>
                <v-icon
                  v-if="item.id_estado == 1"
                  @click="atender(item)"
                  color="red"
                >
                  delete
                </v-icon>
                <responder
                  v-bind:estado="item.id_estado"
                  v-bind:respuesta="item.respuesta"
                  v-bind:specialist-answer="specialistAnswer"
                  v-bind:id-solicitud="item.id_solicitud"
                  v-bind:get-request-by-specialist="getRequestBySpecialist"
                  v-bind:id-tipo-solicitud="request.id_tipo_solicitud"
                  v-bind:request="request"
                />
              </div>
            </v-card-title>
            <v-card-text class="headline font-weight-bold" style="float: left">
              <p class="text text-left">
                {{ item.descripcion }}
              </p>
              <v-divider
                style="border-color: #8d0000"
              />
            </v-card-text>
            <v-card-text v-if="item.respuesta != null" class="headline font-weight-bold" style="float: left">
              <p class="text text-left">
                {{ item.respuesta }}
              </p>
              <v-divider
                style="border-color: #8d0000"
              />
            </v-card-text>
            <v-card-actions>
              <consulta-detalltes-component
                v-bind:estado="item.id_estado"
                v-bind:evaluacion="item.evaluacion"
                v-bind:fecha-creada="item.fecha_creada"
                v-bind:fecha-iniciada="item.fecha_iniciada"
                v-bind:fecha-finalizada="item.fecha_respuesta"
                v-bind:usario="item.nombre_usuario"
              />
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import ConsultaDetalltesComponent from './consultaDetalltesComponent'
import Responder from './responder'
export default {
  name: 'SolicitudesComponent',
  components: { Responder, ConsultaDetalltesComponent },
  props: {
    request: {
      type: Object
    },
    solicitud: {
      type: String
    }
  },
  data: () => ({
    dialog: false,
    items: ['Pendietes (Mias)', 'En progreso (Mias)', 'Finalizadas (Mias)', 'Canceladas (Mias)', 'Todas (Mias)',
      'Pendientes', 'En progreso', 'Finalizadas', 'Canceladas', 'Todas'],
    id: '',
    respuesta: ''
  }),
  computed: {
    ...mapState('suggestions', [
      'requests_specialist'
    ])
  },
  mounted () {
    this.fillId()
    this.getRequestBySpecialist(this.request)
  },
  methods: {
    fillId () {
      if (this.solicitud === 'Pendietes (Mias)') {
        this.request.id = '1'
      } else if (this.solicitud === 'En progreso (Mias)') {
        this.request.id = '2'
      } else if (this.solicitud === 'Finalizadas (Mias)') {
        this.request.id = '3'
      } else if (this.solicitud === 'Canceladas (Mias)') {
        this.request.id = '4'
      } else if (this.solicitud === 'Todas (Mias)') {
        this.request.id = '5'
      } else if (this.solicitud === 'Pendientes') {
        this.request.id = '6'
      } else if (this.solicitud === 'En progreso') {
        this.request.id = '7'
      } else if (this.solicitud === 'Finalizadas') {
        this.request.id = '8'
      } else if (this.solicitud === 'Canceladas') {
        this.request.id = '9'
      } else if (this.solicitud === 'Todas') {
        this.request.id = '0'
      }
    },
    ...mapActions('suggestions', [
      'getRequestBySpecialist',
      'specialistRequestBegin',
      'specialistAnswer'
    ]),
    async atender (item) {
      const request = {}
      request.id_solicitud = item.id_solicitud
      request.fecha_iniciada = moment().format('YYYY-MM-DD')
      request.id_estado = 2
      await this.specialistRequestBegin(request)
      this.getRequestBySpecialist(this.request)
    },
    async responder (item) {
      const request = {}
      request.id_solicitud = item.id_solicitud
      request.respuesta = item
      request.fecha_respuesta = moment().format('YYYY-MM-DD')
      request.id_estado = 3
      await this.specialistAnswer(request)
      this.getRequestBySpecialist(this.request)
      this.respuesta = ''
    }
  },
  watch: {
    solicitud (val) {
      this.fillId()
      this.getRequestBySpecialist(this.request)
    }
  }
}
</script>

<style scoped>
  .glossary {
    border-width: 3px !important;
    border-color: #8d0000 !important;
    border-style: solid !important;
  }
  .line {
    border-width: 1px !important;
    border-color: #8d0000 !important;
    border-style: solid !important;
  }
  .title {
    font-size: 24px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
  }
  .text {
    font-size: 18px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
    color: #464646 !important;
  }
  .v-application .primary--text {
    color: #8d0000 !important;
    caret-color: #8d0000 !important;
  }
  .v-label.primary--text {
    color: #8d0000 !important;
    caret-color: #8d0000 !important;
  }
</style>
