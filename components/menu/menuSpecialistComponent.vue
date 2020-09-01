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
    <v-list dense>
      <v-list-item-title align="center" />
      <v-list-item
        v-for="(item, i) in publicitems"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon color="rgb(204, 82, 41)">
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-list-item-title align="center" />
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon color="rgb(204, 82, 41)">
            {{ item.icon }}
          </v-icon>
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
  name: 'MenuSpecialistComponent',
  props: {
    nombre: {
      type: String,
      default: 'null'
    },
    drawer: {
      default: false
    },
    items: {
      type: Array
    },
    publicitems: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
