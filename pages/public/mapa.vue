<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h1>Mapa de La Ciudad De Camagüey</h1>
          </v-card-title>
          <div id="map" class="map map-home" style="padding: 10px;margin:12px 0 12px 0;height:400px">
            <no-ssr>
              <l-map :zoom="13" :center="[21.3802, -77.92309]">
                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                <l-marker
                  :lat-lng="[21.3801885, -77.9235622]"
                >
                  <l-popup>Oficina del Historiador</l-popup>
                </l-marker>
              </l-map>
            </no-ssr>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Mapa',
  layout: 'principal'
}
</script>

<style scoped>

</style>
