<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-list-item
        v-for="(item, i) in items"
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
    <v-list dense>
      <v-list-item
        v-for="(item, i) in actions"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list
            v-for="subitem in actions.subitems"
          >
            <v-list-item-title v-text="subitem.title" />
          </v-list>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MenuCiudadano',
  props: {
    user: Object
  },
  data: () => ({
    drawer: null,
    items: [
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
      }
    ]
  })
}
</script>

<style scoped>

</style>
