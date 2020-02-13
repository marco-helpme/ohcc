<template>
  <div>
    <h1>Pagina de Ejecutivos</h1>
    <ExecutiveTableComponent></ExecutiveTableComponent>
  </div>
</template>

<script>
import ExecutiveTableComponent from '../../components/ExecutiveTableComponent'
export default {
  name: 'Index',
  components: {
    ExecutiveTableComponent
  }
}
</script>

<style scoped>

</style>
