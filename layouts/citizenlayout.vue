<template>
  <v-app id="inspire">
    <menu-ciudadano></menu-ciudadano>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Ciudadano</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

import MenuCiudadano from '@/components/menu/menuCiudadano'
export default {
  name: 'CitizenLayout',
  components: { MenuCiudadano },
  data: () => ({
    drawer: null
  })
}
</script>

<style scoped>

</style>
