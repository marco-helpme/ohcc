<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-list-item
        v-if="idrolUsuario === '3'"
        v-for="(item, i) in citizensItems"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="idrolUsuario === '2'"
        v-for="(item, i) in specialistItems"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="idrolUsuario === '1'"
        v-for="(item, i) in executivesItems"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'NavigationDrawerComponent',
  props: {
    idrolUsuario: {
      type: String,
      default: '0'
    }
  },
  data: () => ({
    drawer: null,
    citizensItems: [
      {
        icon: 'mdi-apps',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-account',
        title: 'Sugerencias',
        to: '/citizens/sugerencias'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Quejas',
        to: '/citizens/quejas'
      }],
    executivesItems: [
      { title: 'Inicio', icon: 'dashboard', to: '/' },
      { title: 'Directivos', icon: 'account_box', to: '/executives' },
      { title: 'Especialistas', icon: 'account_box', to: '/executives/specialist' },
      { title: 'Solicitudes Respondidas', icon: 'account_box', to: '/executives/graficos/solicitudesRespuestas' },
      { title: 'Evalucaión Promedio Especialistas', icon: 'account_box', to: '/executives/graficos/evalucaionPromedioEspecialistas' },
      { title: 'Comportamiento Solicitudes', icon: 'account_box', to: '/executives/graficos/comportamientoSolicitudesAnuales' }
    ],
    specialistItems: [
      {
        icon: 'mdi-apps',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-account',
        title: 'Especialistas',
        to: '/specialists'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Quejas',
        to: '/citizens/quejas'
      }
    ]
  }),
  methods: {
  }
}
</script>

<style scoped>

</style>
