<template>
  <v-data-table
    :headers="headers"
    :items="executiveUsers"
    sort-by="nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title style="color: #464646">Directivos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn @click="exportar()" color="primary" dark class="mb-2" style="margin: 10px">
              Exportar a PDF
            </v-btn>
            <v-btn v-on="on" color="primary" dark class="mb-2" style="margin: 10px">
              Nuevo Directivo
            </v-btn>
          </template>
          <validation-observer v-slot="{ invalid }">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <validation-provider v-slot="{ errors }" rules="alpha|required|max:15|min:2">
                          <v-text-field id="nombre" v-model="editedItem.nombre" label="Nombre" />
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
                            v-model="editedItem.cargo"
                            :items="cargos"
                            label="Cargo"
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
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn @click="close" color="blue darken-1" text>
                  Cancelar
                </v-btn>
                <v-btn @click="save(editedItem)" :disabled="invalid" color="blue darken-1" text>
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
        v-if="item.id_directivo != user.id_usuario"
        @click="deleteItem(item)"
        small
      >
        delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

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
      { text: 'Cargo', value: 'cargo', align: 'center' },
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
      id_rol: 1,
      id_directivo: null,
      cargo: ''
    },
    defaultItem: {
      nombre: '',
      apellido_1: '',
      apellido_2: '',
      nombre_usuario: '',
      password: '',
      id_rol: 1,
      id_directivo: null,
      cargo: ''
    },
    cargos: []
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Directivo' : 'Editar Directivo'
    },
    ...mapState('executives', [
      'executiveUsers',
      'executives'
    ]),
    ...mapState('users', [
      'user'
    ])
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.llenarcargos()
  },

  methods: {
    ...mapActions('executives', [
      'createExecutive',
      'editExecutive',
      'deleteExecutive',
      'loadExecutivesUsers'
    ]),
    editItem (item) {
      this.editedIndex = this.executiveUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      // const index = this.users.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.deleteExecutive(item)
    },

    llenarcargos () {
      for (let i = 0; i < this.executives.length; i++) {
        this.cargos.push(this.executives[i].cargo)
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    refrech () {
      this.loadExecutivesUsers()
    },

    save () {
      if (this.editedIndex > -1) {
        // Object.assign(this.users[this.editedIndex], this.editedItem)
        this.editExecutive(this.editedItem)
      } else {
        // this.users.push(this.editedItem)
        this.createExecutive(this.editedItem)
      }
      this.close()
    },
    exportar () {
      if (process.browser) {
        window.open('http://localhost/public/api/v1/pdfdirectivo', '_blank')
      }
    }
  }
}
</script>
