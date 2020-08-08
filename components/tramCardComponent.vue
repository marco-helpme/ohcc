<template>
  <v-card
  style="height: 350px"
  >
    <v-card-title>
      <h1 class="nobreack">{{title}}</h1>
    </v-card-title>
    <v-card-title>
      <v-icon
              style="float: right"
              size="250px"
              :color="color"
      >
        {{icon}}
      </v-icon>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'TramCardComponent',
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    color: {
      type: String
    }
  }
}
</script>

<style scoped>
  .visual {
    text-align: center;
    font-size: 32px;
  }
  .details {
    color: #5a5a5a;
  }
  .qform {
    position: absolute;
    right: 10px;
    top: -10px;
    color: orange;
  }
  .nobreack {
    word-break: normal;
  }

</style>
