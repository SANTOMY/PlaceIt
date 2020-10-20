<template>
  <div id="map">
    <l-map ref="map" style="height:600px;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: "map",
  components: { LMap, LTileLayer },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [35.693825, 139.703356],
    };
  }
};
</script> 