<template>
  <v-container fluid>
    <v-data-iterator
      :items="requests_complains"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id_usuario"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.nombre }}
              </v-card-title>

              <v-divider />

              <v-list dense>
                <v-list-item>
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ item.descripcion }}:
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider />

              <v-card-actions>
                <v-btn>Responder</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                dark
                text
                color="primary"
                class="ml-2"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer />

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            @click="formerPage"
            fab
            dark
            color="blue darken-3"
            class="mr-1"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            @click="nextPage"
            fab
            dark
            color="blue darken-3"
            class="ml-1"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// eslint-disable-next-line no-unused-vars
export default {
  name: 'ComplainsistComponent',
  mounted () {
    this.loadRequestComplains()
  },
  props: {
    descripciones: {
      type: Array
    }
  },
  data () {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: [
        'Name',
        'Calories',
        'Fat',
        'Carbs',
        'Protein',
        'Sodium',
        'Calcium',
        'Iron'
      ],
      items: [
        {
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
      ]
    }
  },
  computed: {
    ...mapState('suggestions', [
      'requests_complains'
    ]),
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) { this.page += 1 }
    },
    formerPage () {
      if (this.page - 1 >= 1) { this.page -= 1 }
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    ...mapActions('suggestions', [
      'loadRequestComplains'
    ])
  }
}
</script>

<style scoped>

</style>
