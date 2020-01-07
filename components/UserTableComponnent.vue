<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="nombre"
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
              Nuevo Usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.apellido_1" label="Primer Apellido" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.apellido_2" label="Segundo Apellido" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre_usuario" label="Nombre de Usuario" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Contraseña" type="password" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id_rol" label="Rol" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn @click="close" color="blue darken-1" text>
                Cancel
              </v-btn>
              <v-btn @click="save(editedItem)" color="blue darken-1" text>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
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
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'nombre'
      },
      { text: 'Primer Apellido', value: 'apellido_1' },
      { text: 'Segundo Apellido', value: 'apellido_2' },
      { text: 'Nombre de Usuario', value: 'nombre_usuario' },
      { text: 'Contraseña', value: 'password' },
      { text: 'Rol', value: 'id_rol' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    // users: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      apellido_1: '',
      apellido_2: '',
      nombre_usuario: '',
      password: '',
      id_rol: 1
    },
    defaultItem: {
      nombre: '',
      apellido_1: '',
      apellido_2: '',
      nombre_usuario: '',
      password: '',
      id_rol: 1
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
    ...mapState('users', [
      'users'
    ])
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {

  },

  methods: {
    ...mapActions('users', [
      'createUser',
      'deleteUser',
      'editUser',
      'loadUsers'
    ]),
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      // const index = this.users.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.deleteUser(item)
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
        this.editUser(this.editedItem)
      } else {
        // this.users.push(this.editedItem)
        this.createUser(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
