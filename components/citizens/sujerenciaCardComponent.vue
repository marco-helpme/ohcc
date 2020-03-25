<template>
  <div>
    <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="400"
    >
      <v-card-title>
        <v-icon
          large
          left
        >
          mdi-twitter
        </v-icon>
        <span class="title font-weight-light">Sugerencia #{{ items.id_solicitud }}</span>
        <v-row
          align="center"
          justify="end"
        >
          <v-icon
            @click="editarSugerencia"
            small
            class="mr-2"
          >
            edit
          </v-icon>
          <v-icon
            @click="borrarSugerencia()"
            small
          >
            delete
          </v-icon>
        </v-row>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        {{ items.descripcion }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>{{ items.fecha_creada }} </v-list-item-title>
          </v-list-item-content>
          <v-row
            align="center"
            justify="end"
          >
            <span class="subheading" v-if="items.id_estado == 1" style="padding-right: 5px">Pendiente</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SujerenciaCardComponent',
  props: {
    items: Object,
    editarSugerencia: Function,
    borrarSugerencia: Function
  },
  data: () => ({
  })
}
</script>

<style scoped>

</style>
