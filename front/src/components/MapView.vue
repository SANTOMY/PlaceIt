<template>
<!-- レイヤのような形で生成される -->
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
    name: "MapView",
    data: function(){
      return {
      lat:0,//緯度
      lon:0,//経度
      map: null,//Mapオブジェクト
      zoom:15,//zoomのサイズ まだうまく制御できてない(SATD)
      spot:null,//spot用のオブジェクト
      };
    },
    methods: {
    //Map上のどこかををクリックした時に起動する関数
      MapClickEvent(event){
        this.GetPoint(event);
      },
    //Map上のクリックされた箇所の経緯度を取得する関数
      GetPoint: function(event){
        this.lat = event.latlng.lat;
        this.lon = event.latlng.lng;
      },
      //Markerがクリックされた時に起動する関数
      MarkerClickEvent(event){
        console.log(event.latlng);
      },
    },
    mounted() {
      //Mapオブジェクトの生成
      this.map = L.map('map',{zoom: this.zoom})
      .addLayer(
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy <a href="https://openstreetmap.org">OpenStreetMap</a>'
        })
      );
      //Map上のある地点がクリックされた時に起動する関数の登録
      this.map.on('click', this.MapClickEvent);

      //初期位置を現在地に
      this.map.locate({ setView: true,maxZoom: 18})

      //マーカーの登録とマーカークリック時に起動する関数の登録
      this.marker = L.marker([33.3623,130.2505],{ title: "sample spot"}).addTo(this.map).on(
        'click', this.MarkerClickEvent);
    }, 
}
</script>

<style scoped>
/* むやみにいじると地図表示が消えるので注意*/
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
</style>