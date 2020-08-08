<template>
  <v-layout>
    <v-flex>
      <!--      head de la pagina-->
      <section>
        <!--                      <v-parallax src="portada.jpg" />-->
        <v-img height="50%" src="portada.jpg" />
      </section>
      <!--      Presentacion de los direcctivos-->

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .600
        }"
        transition="slide-x-transition"
      >
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
                  Trámites y Servicios
                </h2>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <template>
                      <tram-card-component
                        v-bind:icon="'mdi-frequently-asked-questions'"
                        v-bind:title="'Consulta'"
                        v-bind:color="'red'"
                      />
                    </template>
                  </v-flex>
                  <v-flex xs12 md4>
                    <template>
                      <tram-card-component
                        v-bind:icon="'mdi-office-building'"
                        v-bind:title="'Asesorías Técnicas'"
                        v-bind:color="'red'"
                      />
                    </template>
                  </v-flex>
                  <v-flex xs12 md4>
                    <template>
                      <tram-card-component
                        v-bind:icon="'mdi-domain'"
                        v-bind:title="'Consulta para Acciones Constructivas'"
                        v-bind:color="'red'"
                      />
                    </template>
                  </v-flex>
                  <v-flex xs12 md4>
                    <template>
                      <tram-card-component
                        v-bind:icon="'mdi-thought-bubble'"
                        v-bind:title="'Sugerencias'"
                        v-bind:color="'red'"
                      />
                    </template>
                  </v-flex>
                  <v-flex xs12 md4>
                    <template>
                      <tram-card-component
                        v-bind:icon="'mdi-emoticon-angry'"
                        v-bind:title="'Quejas'"
                        v-bind:color="'red'"
                      />
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>
      </v-lazy>

      <section>
        <v-parallax src="rocas.jpg" height="380" />
      </section>
      <v-lazy
        v-intersect="onIntersect"
        v-model="isActive"
        :options="{
          threshold: .600
        }"
        transition="slide-x-transition"
      >
        <section>
          <v-container>
            <v-layout row wrap justify-center class="my-12">
              <v-flex xs12 sm5>
                <v-card flat class="transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div>
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
      </v-lazy>
      <template />
    </v-flex>
  </v-layout>
</template>

<script>
import TramCardComponent from '~/components/tramCardComponent'
export default {
  components: { TramCardComponent },
  layout: 'principal',
  data: () => ({
    isActive: false,
    isIntersecting: false,
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ],
    servicios: [
      { title: 'Consulta', text: 'Brindamos el servicio de assesoria tecnica', color: 'red', icon: 'cancel' },
      { title: 'Asesoría Técnia', text: 'Brindamos el servicio de assesoria tecnica', color: 'blue', icon: 'diamond' },
      { title: 'Consulta para Acciones Constructivas', text: 'Brindamos el servicio de assesoria tecnica', color: 'indigo' },
      { title: 'Asesoría Técnia', text: 'Brindamos el servicio de assesoria tecnica', color: 'orange' },
      { title: 'Asesoría Técnia', text: 'Brindamos el servicio de assesoria tecnica', color: 'purple' }
    ]
  }),
  mounted () {
    this.$fbCustomerChat.setOptions({
      theme_color: '#41B883'
    })
  },
  methods: {
    onIntersect (entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting
    }
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
