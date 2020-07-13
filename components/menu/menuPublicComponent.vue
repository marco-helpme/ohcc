
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
              </v-list-item-title>
<!--                            <v-list-item-subtitle>-->
<!--                              <p class="blank">-->
<!--                                subtext-->
<!--                              </p>-->
<!--                            </v-list-item-subtitle>-->
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
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon color="#cc5229">{{ item.icon }}</v-icon>
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
          <v-icon color="#cc5229">{{ item.icon }}</v-icon>
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
  name: 'MenuPublicComponent',
  props: {
    nombre: {
      type: String,
      default: 'null'
    },
    drawer: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
