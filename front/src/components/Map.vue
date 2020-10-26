<template>
  <div id='map'>
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
    data: function(){
      return {
      lat:0,//緯度
      lon:0,//経度
      map: null,
      zoom:15,
      counter:0,
      };
    },
    
    mounted() {
      //テストの値
      this.lon = 135;
      this.lat = 35;

      //Mapオブジェクトの生成
      this.map = L.map('map')
      .setView([this.lat, this.lon],this.zoom)
      .addLayer(
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy <a href="https://openstreetmap.org">OpenStreetMap</a>'
        })
      );

      //位置情報検索
      this.map.locate({ setView: true,maxZoom: 20})
    }
}
</script>

<style>
html,
body,
#map { 
  height: 100%; 
  width: 100%;
  }
body {
  margin: 0;
  height: 100%;
}
</style>