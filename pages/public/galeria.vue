<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    />
  </v-carousel>
</template>

<script>
export default {
  name: 'Galeria',
  layout: 'principal',
  data () {
    return {
      items: [
        {
          src: '/img/1.jpeg'
        },
        {
          src: '/img/2.jpeg'
        },
        {
          src: '/img/3.jpeg'
        },
        {
          src: '/img/4.jpeg'
        },
        {
          src: '/img/5.jpeg'
        },
        {
          src: '/img/6.jpeg'
        },
        {
          src: '/img/7.jpeg'
        },
        {
          src: '/img/8.jpeg'
        },
        {
          src: '/img/9.jpeg'
        },
        {
          src: '/img/10.jpeg'
        },
        {
          src: '/img/11.jpeg'
        },
        {
          src: '/img/12.jpeg'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
