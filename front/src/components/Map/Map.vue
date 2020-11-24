<template>
<!-- mapレイヤのような形で生成される -->
  <div id='map'>
    <!-- spot種別検索メニュー -->
    <type-button/>
    <!-- 通常モードとスポット登録モードの切り替えボタン -->
    <spot-reg-button :regFlag="regFlag" v-on:click.native="changeMode()"/>
    <!-- 現在地ボタン -->
    <now-loc-button v-on:click.native="nowLocation()"/>
  </div>
</template>

<script>
import  'leaflet/dist/leaflet.css'
import  L from 'leaflet'
import spotRegButton from './MapButtons/SpotRegButton.vue'
import nowLocButton from './MapButtons/NowLocButton.vue'
import typeButton from './MapButtons/TypeButton.vue'

delete  L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions(
    {   iconUrl         : require( 'leaflet/dist/images/marker-icon.png' )
    ,   iconRetinaUrl   : require( 'leaflet/dist/images/marker-icon-2x.png' )
    ,   shadowUrl       : require( 'leaflet/dist/images/marker-shadow.png' )
    }
)


export default {
    name: "Map",
    components:{
      spotRegButton,
      nowLocButton,
      typeButton,
    },
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
        locMarker:null,//現在地のマーカーオブジェクト     
        nowType:'reset',//スポット検索の種別
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
        console.log(this.nowType)//debug

      },
      //現在地アイコンを更新する関数(予定)
      locationMarker(){
        //this.locMarker = L.marker(location.latlng,{icon:this.currentLocationIcon}).addTo(this.map)//debug
      },
      //スポット登録関数
      //SATD:経緯度をリンクで渡しているが、propsで渡す
      regSpot: function(){
        this.$router.push({ name: 'register', query: { "lat": this.lat,"lon":this.lon}});
      },
      //通常モードと登録モードの切り替え関数
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
      //マップの中心を現在地に更新する関数
      nowLocation: function(){
        this.map.locate({ setView: true,maxZoom: 18});
        //現在地マーカーを設置
        //this.map.on("locationfound",this.locationMarker);
      },
    },
    mounted: function() {
      //Mapオブジェクトの生成
      this.map = L.map('map',{zoom: this.zoom})
      .addLayer(
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy <a href="https://openstreetmap.org">OpenStreetMap</a>'
        })
      );

      //初期位置を現在地に
      this.map.locate({ setView: true,maxZoom: 18});

      //現在地マーカーを設置(予定)
        //this.map.on("locationfound",this.locationMarker);

      //マーカーの登録とマーカークリック時に起動する関数の登録
      this.marker = L.marker([33.3623,130.2505],{ title: "sample spot"}).addTo(this.map).on(
        'click', this.markerClickEvent);
    }, 
    //現在地追跡のために利用(予定)
    watch: {
    }
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
  /* 各オブジェクトのstyleでz-indexを0以上に設定する 
  基本は1000でOK*/
#v-list-item,
#feature-menu,
#feature-button,
#feature-list{
  z-index: 1000;
}
</style>