<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in items"
        cols="4"
      >
        <a :href="item.href" style="text-decoration: none;" target="_black">
          <v-card class="mx-auto cardPdf" max-width="250">
            <v-img src="/img/filepdf.svg" />
            <!-- <v-icon color="red" size="200px">mdi-file-document-outline</v-icon> -->
            <v-card-title class="text">{{ item.title }}</v-card-title>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Regulaciones',
  data: () => ({
    items: [
      { title: 'Libro de Regulaciones', href: '/books/libro_de_regulaciones_camaguey.pdf' },
      { title: 'Gaceta Oficial No. 23 Extraordinaria 17 junio 2015', href: '/books/goc_ex23.pdf' },
      { title: 'Gaceta Oficial No. 35 Extraordinaria 17 julio 2018', href: '/books/goc_ex35.pdf' },
      { title: 'Gaceta Oficial No. 77 Extraordinaria 5 diciembre 2018 ', href: '/books/goc_ex77.pdf' },
      { title: 'Documentación para TCP', href: '/books/doc_tcp.pdf' },
      { title: 'Reglamento de la Plaza San Juan de Dios', href: '/books/plaza_san_juan_de_dios.pdf' },
      { title: 'Reglamento Parque Agramonte', href: '/books/parque_agramonte.pdf' },
      { title: 'Reglamento Casino Campestre', href: '/books/casino.pdf' },
      { title: 'Reglamento Centro de Servicios de la Ciudad', href: '/books/reglamento.pdf' },
      { title: 'Reglamento Centro de Servicios de la Ciudad Anexo 1', href: '/books/reglamento_anexo1.pdf' },
      { title: 'Reglamento Centro de Servicios de la Ciudad Anexo 2', href: '/books/reglamento_anexo2.pdf' },
      { title: 'Reglamento Centro de Servicios de la Ciudad Anexo 3', href: '/books/reglamento_anexo3.pdf' },
      { title: 'Ley No. 1', href: '/books/ley1.pdf' },
      { title: 'Ley No. 2', href: '/books/ley2.pdf' },
      { title: 'Decreto No. 55', href: '/books/decreto55.pdf' },
      { title: 'Decreto No. 118', href: '/books/decreto118.pdf' },
      { title: 'Edificios 2', href: '/books/edificios2.pdf' },
      { title: 'Inmuebles GP2', href: '/books/inmuebles_gp2.pdf' }
    ]
  })
}
</script>

<style scoped>
.cardPdf {
  background: none;
  box-shadow: none;
  /*border: none;*/
  /*text-align: center;*/
}
  .text {
    text-align: center;
    font-weight: bold;
    word-break: normal;
  }
</style>
