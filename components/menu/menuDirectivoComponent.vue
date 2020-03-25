<template>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MenuDirectivoComponent',
  data () {
    return {
      items: [
        { title: 'Inicio', icon: 'dashboard', to: '/' },
        { title: 'Directivos', icon: 'account_box', to: '/executives' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
