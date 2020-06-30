<template>
  <v-layout>
    <v-flex>
      <!--      head de la pagina-->
      <section>
        <v-parallax src="portada.jpg" />
      </section>
      <!--      Presentacion de los direcctivos-->
      <section>
        <v-layout
          column
          wrap
          class="my-12"
          align-center
        >
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <h2 class="font">
                Quienes Atienden a la Población
              </h2>
              <span class="subheading">
                Trabajamos para su satisfacción
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <template>
                    <tram-card-component/>
                  </template>
                </v-flex>
                <v-flex xs12 md4>
                  <template>
                    <v-card
                      class="mx-auto"
                      max-width="400"
                    >
                      <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      >
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                      </v-img>

                      <v-card-subtitle class="pb-0">
                        Number 10
                      </v-card-subtitle>

                      <v-card-text class="text--primary">
                        <div>Whitehaven Beach</div>

                        <div>Whitsunday Island, Whitsunday Islands</div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                          color="orange"
                          text
                        >
                          Share
                        </v-btn>

                        <v-btn
                          color="orange"
                          text
                        >
                          Explore
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-flex>
                <v-flex xs12 md4>
                  <template>
                    <v-card
                      class="mx-auto"
                      max-width="400"
                      padding="5px"
                    >
                      <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      >
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                      </v-img>

                      <v-card-subtitle class="pb-0">
                        Number 10
                      </v-card-subtitle>

                      <v-card-text class="text--primary">
                        <div>Whitehaven Beach</div>

                        <div>Whitsunday Island, Whitsunday Islands</div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                          color="orange"
                          text
                        >
                          Share
                        </v-btn>

                        <v-btn
                          color="orange"
                          text
                        >
                          Explore
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="rocas.jpg" height="380" />
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="">
                    <h3>Oficina de Orientación y Consulta</h3>
                  </div>
                </v-card-title>
                <v-card-text>
                  <p>Contribuimos a preservar el Patrimonio Histórico Cultural camagüeyano y los rasgos de su identidad, logrando la participación activa y el disfrute de sus moradores. Constituimos un proyecto sustentable, que involucra otras instituciones y a la comunidad. Contamos con un proceso inversionista confiable y está consolidada una imagen propia que nos identifica como institución vinculada a los distintos públicos. Disponemos de recursos humanos que garantizan la Misión de la OHCC</p>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent" color="black">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">
                    Contactenos
                  </div>
                </v-card-title>
                <v-card-text>
                  San Fernando No. 107 entre Tio Perico y Castellanos, Camaguey
                </v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">
                        mdi-phone
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title><a href="tel:: 32241095">(32)241095</a></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <template>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import TramCardComponent from '~/components/tramCardComponent'
export default {
  components: { TramCardComponent },
  layout: 'principal',
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ]
  }),
  mounted () {
    this.$fbCustomerChat.setOptions({
      theme_color: '#41B883'
    })
  }
}
</script>

<style lang="css">
  .font {
    font-size: 1.5rem !important;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: normal !important;
    font-family: Lucida Bright,Georgia,serif;
  }
</style>
