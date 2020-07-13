<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <div class="rojo_desaturado">
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col>
              <v-list-item-title class="headline blank">
                <v-container>
                  <v-row>
                    <v-col>
                      {{ nombre }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item-title>
              <!--              <v-list-item-subtitle>-->
              <!--                <p class="blank">-->
              <!--                  subtext-->
              <!--                </p>-->
              <!--              </v-list-item-subtitle>-->
            </v-col>
            <v-col>
              <v-list-item-title class="headline blank">
                <img src="/faviconohcc.png" alt="logo" class="logo">
              </v-list-item-title>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </div>

    <v-divider />
    <v-list dense>
      <v-list-item
        v-if="idrolUsuario === '0'"
        v-for="(item, i) in publicitems"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon color="#cc5229">
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="idrolUsuario === '3'"
        v-for="(item, i) in citizensItems"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon color="#cc5229">
            {{ item.icon }}
          </v-icon>
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
    },
    nombre: {
      type: String,
      default: ''
    },
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // drawer: true,
    publicitems: [
      {
        icon: 'mdi-bookmark',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-magnify',
        title: 'Glosario',
        to: '/public/glosario'
      },
      {
        icon: 'mdi-book-multiple',
        title: 'Libros y Regulaciones',
        to: '/public/libroyregulaciones'
      },
      {
        icon: 'mdi-map',
        title: 'Mapa',
        to: '/public/mapa'
      },
      {
        icon: 'mdi-image-multiple',
        title: 'Galería',
        to: '/public/galeria'
      }],
    citizensItems: [
      {
        icon: 'mdi-bookmark',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-thought-bubble',
        title: 'Sugerencias',
        to: '/citizens/sugerencias'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Quejas',
        to: '/citizens/quejas'
      },
      {
        icon: 'mdi-magnify',
        title: 'Glosario',
        to: '/public/glosario'
      },
      {
        icon: 'mdi-book-multiple',
        title: 'Libros y Regulaciones',
        to: '/public/libroyregulaciones'
      },
      {
        icon: 'mdi-map',
        title: 'Mapa',
        to: '/public/mapa'
      },
      {
        icon: 'mdi-image-multiple',
        title: 'Galería',
        to: '/public/galeria'
      }],
    executivesItems: [
      { title: 'Inicio', icon: 'dashboard', to: '/' },
      { title: 'Directivos', icon: 'cancel', to: '/executives' },
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
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Solicitudes',
        to: '/specialists/solicitudes'
      }
    ]
  }),
  methods: {
  }
}
</script>

<style scoped lang="css">
/*.blank {*/
/*  color: #f1f1f1;*/
/*}*/
  .logo {
    width: 75px;
    height: 75px;
    float: right;
  }
</style>
