<template>
  <v-app dark>
    <menuComponent />
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        @click.stop="miniVariant = !miniVariant"
        icon
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        @click.stop="clipped = !clipped"
        icon
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        @click.stop="fixed = !fixed"
        icon
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        @click.stop="rightDrawer = !rightDrawer"
        icon
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import menuComponent from '@/components/menuComponent'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      color: 'red',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal'
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-account',
          title: 'Usuarios',
          to: '/users'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Ciudadanos',
          to: '/citizens'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Sujerencias',
          to: '/suggestions'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Oficina de Orientacion y Consulta'
    }
  },
  computed: {
    ...mapActions('citizens', [
      'loadCitizens'
    ])
  },
  components: {
    menuComponent
  }
}
</script>
