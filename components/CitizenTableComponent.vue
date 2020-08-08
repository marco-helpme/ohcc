<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="citizens"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="primary" dark class="mb-2">
                Nuevo Ciudadano
              </v-btn>
            </template>
            <v-card>
              <v-form>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.nombre" label="Nombre" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.nombre_usuario" label="Usuario" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.apellido_1" label="Primer Apellido" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.apellido_2" label="Segundo Apellido" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.ci" label="Ci" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.dir_particular" label="Dirección Particular" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.telef" label="Teléfono" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.email" type="email" label="Correo Electrónico" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.id_tipo_ciudadano" label="Tipo de Ciudadano" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.password" type="password" label="Contraseña" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="citizen.id_rol" type="text" label="Id Rol" validate-on-blur />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="close" color="blue darken-1" text>
                    Cancel
                  </v-btn>
                  <v-btn @click="createCitizen(citizen)" color="blue darken-1" text>
                    <nuxt-link to="/citizens" />
                    Enviar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          @click="editCitizen(item)"
          small
          class="mr-2"
        >
          edit
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
          small
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn @click="initialize" color="primary">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    citizens: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      nombre: '',
      nombre_usuario: '',
      apellido_1: '',
      apellido_2: '',
      ci: 0,
      dir_particular: '',
      telef: 0,
      email: '',
      id_tipo_ciudadano: '',
      password: '',
      id_rol: ''
    },
    defaultItem: {
      nombre: '',
      nombre_usuario: '',
      apellido_1: '',
      apellido_2: '',
      ci: 0,
      dir_particular: '',
      telef: 0,
      email: '',
      id_tipo_ciudadano: '',
      password: '',
      id_rol: ''
    },
    citizen: {}
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Ciudadano' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
    },
    ...mapActions('citizens', [
      'createCitizen',
      'deleteCitizen',
      'editCitizen'
    ]),

    editItem (item) {
      this.editedIndex = this.citizens.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const response = confirm(`Are you sure you want to delete ${item.nombre}`)
      if (response) {
        this.$store.dispatch('citizens/deleteCitizens', item)
      }
    },

    close () {
      this.dialog = false
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.citizens[this.editedIndex], this.editedItem)
      } else {
        this.citizens.push(this.editedItem)
      }
      this.close()
    }
    // descargarPDF () {
    //   if (process.browser) {
    //     // eslint-disable-next-line new-cap
    //     const doc = new jsPDF()
    //     doc.autoTable({ html: '#my-table' })
    //     doc.save('miPDf.pdf')
    //   }
    // },
    // exportPDF () {
    //   if (process.client) {
    //     require('jspdf')
    //     require('jspdf-autotable')
    //     const doc = new jsPDF()
    //     doc.autotable(this.headers)
    //     doc.save('mypdf.pdf')
    //   }
    // }
  }
}

</script>

<style scoped>

</style>
