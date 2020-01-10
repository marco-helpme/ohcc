<template>
  <div>
    <h1>
      index de las sujerencias
    </h1>
    {{ suggestions }}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Index',
  computed: {
    ...mapState('suggestions', [
      'suggestions'
    ])
  }
}
</script>

<style scoped>

</style>
