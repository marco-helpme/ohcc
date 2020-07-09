<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      dark
      class="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon
            color="red"
          >
            delete
          </v-icon>
        </v-btn>
      </template>
      <v-card
      color="red">
        <v-container>
          <v-row
            justify="center">
            <v-icon
              color="yellow"
              x-large
            >
              mdi-alert
            </v-icon>
          </v-row>
          <v-row
            justify="center">
            <p class="text-font text-center">Esta seguro que desea eliminar este tramite</p>
          </v-row>
          <v-row
            justify="space-around">
            <v-col
              cols="2">
              <v-btn
                icon
                large
                @click="dialog = !dialog"
              >
                <p class="text-capitalize">NO  <v-icon>
                  mdi-cancel
                </v-icon></p>
              </v-btn>
            </v-col>
            <v-col
              cols="2">
              <v-btn
                icon
                large
                @click="eliminar(item)"
              >
                <p class="text-capitalize">SI  <v-icon>
                  mdi-check
                </v-icon></p>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'EliminarTramiteComponent',
  data () {
    return {
      dialog: false
    }
  },
  props: {
    item: {
      type: Object
    },
    eliminar: {
      type: Function
    }
  }
}
</script>

<style scoped>
.text-font {
  font-size: large;
}
  .dialog {
    box-shadow: none;
  }
</style>
