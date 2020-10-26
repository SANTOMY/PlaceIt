<template>
  <div class="folium-map" id='map'>
      <v-btn 
      id='btn1'
      absolute
      class="mx-2"
      fab
      dark
      color="primary"
      >
      aaaaa
      </v-btn>
  </div>
</template>

<script>
import  'leaflet/dist/leaflet.css'
import  L from 'leaflet'

delete  L.Icon.Default.prototype._getIconUrl


L.Icon.Default.mergeOptions(
    {   iconUrl         : require( 'leaflet/dist/images/marker-icon.png' )
    ,   iconRetinaUrl   : require( 'leaflet/dist/images/marker-icon-2x.png' )
    ,   shadowUrl       : require( 'leaflet/dist/images/marker-shadow.png' )
    }
)


export default {
    name: "Map",
    data: function(){
      return {
      lat:0,//緯度
      lon:0,//経度
      map: null,
      zoom:25,
      counter:0,
      spot:null,
      };
    },
    
    mounted() {
      //テストの値
      this.lon = 135;
      this.lat = 35;

      //Mapオブジェクトの生成
      this.map = L.map('map')
      .addLayer(
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy <a href="https://openstreetmap.org">OpenStreetMap</a>'
        })
      );
      //初期位置を現在地に
      this.map.locate({ setView: true,maxZoom: this.zoom})

      //マーカーをおいてみる
      this.marker = L.marker([33.3623,130.2505],{ title: "sample spot"}).addTo(this.map).on(
        'click', function(){
          console.log('aiueo')
        }
        )
    }
  
}
</script>

<style scoped>
html,
body,
#map { 
  height: 100%; 
  width: 100%;
  z-index: 0;
  }
body {
  margin: 0;
  height: 100%;
}
#btn1{
  z-index: 1000;

}
</style>