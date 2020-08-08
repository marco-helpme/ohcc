<template>
  <v-data-table
    :headers="headers"
    :items="specialistUser"
    sort-by="nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title style="color: #464646">Especialistas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" dark class="mb-2" style="margin: 10px">
              Nuevo Especialista
            </v-btn>
          </template>
          <validation-observer v-slot="{ invalid }">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                      <v-text-field v-model="editedItem.nombre" label="Nombre" />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                        <v-text-field v-model="editedItem.apellido_1" label="Primer Apellido" />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                        <v-text-field v-model="editedItem.apellido_2" label="Segundo Apellido" />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="required|alpha_num|max:10|min:3">
                        <v-text-field v-model="editedItem.nombre_usuario" label="Nombre de Usuario" />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="required">
                        <v-select
                          v-model="editedItem.categoria"
                          :items="categorias"
                          label="Categorias"
                        />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="required|max:15|min:6" vid="confirmation">
                        <v-text-field v-model="editedItem.password" label="Contraseña" type="password" />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
                      <validation-provider v-slot="{ errors }" rules="required|confirmed:confirmation">
                        <v-text-field v-model="confirmation" type="password" label="Repita la Contraseña" />
                        <span>{{ errors[0] }}</span>
                      </validation-provider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="close" color="blue darken-1" text>
                  Cancelar
                </v-btn>
                <v-btn :disabled="invalid" @click="save(editedItem)" color="blue darken-1" text>
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-card>
          </validation-observer>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        @click="editItem(item)"
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
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import 'jspdf-autotable'
export default {
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    confirmation: '',
    dialog: false,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'nombre'
      },
      { text: 'Primer Apellido', value: 'apellido_1', align: 'center' },
      { text: 'Segundo Apellido', value: 'apellido_2', align: 'center' },
      { text: 'Nombre de Usuario', value: 'nombre_usuario', align: 'center' },
      { text: 'Categoria', value: 'categoria', align: 'center' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' }
    ],
    // users: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      apellido_1: '',
      apellido_2: '',
      nombre_usuario: '',
      password: '',
      categoria: '',
      id_rol: 2
    },
    defaultItem: {
      nombre: '',
      apellido_1: '',
      apellido_2: '',
      nombre_usuario: '',
      password: '',
      categoria: '',
      id_rol: 2
    },
    defaultItemPDF: [
      ['nombre',
        'apellido_1',
        'apellido_2',
        'nombre_usuario',
        'password',
        'categoria',
        'id_rol'
      ]],
    categorias: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Especialista' : 'Editar Especialista'
    },
    ...mapState('specialists', [
      'specialistUser',
      'specialists'
    ])
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.llenarcategorias()
  },

  methods: {
    ...mapActions('specialists', [
      'createSpecialist',
      'editSpecialist',
      'deleteSpecialist',
      'loadSpecialistUser'
    ]),
    editItem (item) {
      this.editedIndex = this.specialistUser.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    llenarcategorias () {
      for (let i = 0; i < this.specialists.length; i++) {
        this.categorias.push(this.specialists[i].categoria)
      }
    },

    deleteItem (item) {
      // const index = this.users.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.deleteSpecialist(item)
      this.loadSpecialistUser()
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    refrech () {
      this.loadUsers()
    },

    save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.users[this.editedIndex], this.editedItem)
        this.editSpecialist(this.editedItem)
      } else {
        // this.users.push(this.editedItem)
        this.createSpecialist(this.editedItem)
      }
      this.close()
    },
    // descargarPDF () {
    //   if (process.browser) {
    //     const jsPDF = require('jspdf')
    //     require('jspdf-autotable')
    //     // eslint-disable-next-line new-cap
    //     const doc = new jsPDF()
    //     doc.autoTable(
    //       { head: this.defaultItemPDF }
    //     )
    //     doc.save('miPDf.pdf')
    //   }
    // }
    // async descargar () {
    //   if (process.browser) {
    //     response = await this.$axios.get('exportPDF')
    //     const jsPDF = require('jspdf')
    //     // eslint-disable-next-line new-cap
    //     const doc = new jsPDF()
    //     doc.
    //     doc.save(response)
    //   }
    // }
    descargarPDF1 () {
      if (process.browser) {
        window.open('http://localhost/public/api/v1/exportPDF', '_blank')
      }
    }
  }
}
</script>
