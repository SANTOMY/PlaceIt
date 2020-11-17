<template>
<!-- mapレイヤのような形で生成される -->
  <div id='map'>
    <v-container>
      <v-row>
    <v-btn
    id='feature'
    absolute
    class="mx-10 my-5"
    small
    fab
    >
    aaa
    </v-btn>

    <v-btn
    id='feature'
    absolute
    class="mx-10 my-5"
    small
    fab
    >
    bbb
    </v-btn>

    <v-btn
    id='feature'
    absolute
    class="mx-10 my-5"
    small
    fab
    >
    ccc
    </v-btn>
    </v-row>
    </v-container>

    <!-- 通常モードとスポット登録モードの切り替えボタン -->
    <v-btn 
      id='map-reg'
      absolute
      small
      right
      fab
      v-on:click="changeMode()"
    >
    <!-- 通常モードアイコン -->
     <v-icon
      v-if="!regFlag"
      color="#CC1651"
      class="px-5"
      >
        mdi-map-marker
     </v-icon>
      <!-- 登録モードアイコン -->
     <v-icon
      v-if="regFlag"
      color="#16A6CC"
      class="px-5"
      >
        mdi-map-marker
     </v-icon>
    </v-btn>

    <!-- 現在地ボタン -->
    <v-btn
    id='now-loc'
    absolute
    class="mx-4 my-15"
    small
    right
    bottom
    fab
    v-on:click="nowLocation()"
    >
    <v-icon
      color="#5D8C99"
      class="px-5">
        mdi-crosshairs-gps
    </v-icon>
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
        map: L.map,//Mapオブジェクト
        zoom:15,//zoomのサイズ まだうまく制御できてない(SATD)
        spot:null,//spot用のオブジェクト
        myplace:null,//現在地オブジェクト
        regFlag:false,//スポット登録モードのフラグ
        flag :false,//実装上の都合で導入したフラグ
        locMarker:false,//現在地のマーカーオブジェクト
      };
    },
    methods: {
    //Map上のどこかををクリックした時に起動する関数
      mapClickEvent(event){
        if(this.flag){
          this.flag=false
          this.getPoint(event);
          this.regSpot(event);
        }else{this.flag=true;}
      },
    //Map上のクリックされた箇所の経緯度を取得する関数
      getPoint: function(event){
        this.lat = event.latlng.lat;
        this.lon = event.latlng.lng;
      },
      //Markerがクリックされた時に起動する関数
      markerClickEvent(event){
        console.log(event.latlng);//debug
      },
      regSpot: function(){
        this.$router.push({ name: 'register', query: { "lat": this.lat,"lon":this.lon}});
      },
      changeMode: function(){
        this.regFlag = !this.regFlag;
        if(this.regFlag){
        this.flag=false
        this.map.on('click', this.mapClickEvent);
        }
        else{
        this.map.off('click')
        }
      },
      nowLocation: function(){
        this.map.locate({ setView: true,maxZoom: 18});
      },

    },
    mounted: async function() {
      //Mapオブジェクトの生成
      this.map = L.map('map',{zoom: this.zoom})
      .addLayer(
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy <a href="https://openstreetmap.org">OpenStreetMap</a>'
        })
      );
      //Map上のある地点がクリックされた時に起動する関数の登録
        //this.map.on('click', this.mapClickEvent);
        //this.map.off('click');//debug

      //初期位置を現在地に
      this.map.locate({ setView: true,maxZoom: 18});

      //マーカーの登録とマーカークリック時に起動する関数の登録
      this.marker = L.marker([33.3623,130.2505],{ title: "sample spot"}).addTo(this.map).on(
        'click', this.markerClickEvent);

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
#aaa {
  z-index:1000;
}
#map-reg{
  /* 各オブジェクトのstyleでz-indexを0以上に設定する 
  基本は1000でOK*/
  z-index: 1000;
}
#now-loc{
  z-index: 1000;
}
#feature{
  z-index: 1000;
}
</style>