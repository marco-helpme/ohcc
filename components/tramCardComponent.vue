<template>
 <v-card>
   <v-card-title>
     <h1>Acciones Constructivas</h1>
     <v-icon
     style="float: right">
       mdi-account-question
     </v-icon>
   </v-card-title>
 </v-card>
</template>

<script>
export default {
  name: 'TramCardComponent'
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

</style>
