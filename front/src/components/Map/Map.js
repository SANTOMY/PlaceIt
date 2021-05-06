import  'leaflet/dist/leaflet.css'
import  L from 'leaflet'
import spotRegButton from './MapButtons/SpotRegButton.vue'
import nowLocButton from './MapButtons/NowLocButton.vue'
import {getSpot} from '../../routes/spotRequest'
import spotDetail from '../SpotDetail/SpotDetail.vue'
import searchDialog from './MapButtons/SearchDialog.vue'

//アイコンをロード
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
      spotDetail,
      searchDialog
    },
    data: function(){
      return {
        lat:0,//緯度
        lon:0,//経度
        map: L.map,//Mapオブジェクト
        zoom:10,//zoomのサイズ まだうまく制御できてない(SATD)
        spot:null,//spot用のオブジェクト
        review:null,//review用のオブジェクト
        myplace:null,//現在地オブジェクト
        regFlag:false,//スポット登録モードのフラグ
        flag :false,//実装上の都合で導入したフラグ
        locMarker:null,//現在地のマーカーオブジェクト 
        nowType:'reset',//スポット検索の種別 "reset" "restaurant" "travel" "shopping"
        time:0,//タイマー用変数
        showDialog:false, //ダイアログを表示するか
        selectedSpotID: "", //クリックして選択しているspotのid
        markers:null,//マーカーリストのレイヤー群
        univFlag:false,//大学別検索の有効化・無効化
        user:{
          username:null, 
          email: null,
          password: null,
          univ:"",
        }
      };
    },
    methods: {
    //Map上に検索条件にあったスポットを表示する関数
      showSpot: async function(type,univ){
        if (type=="reset") type = "";
        var data = await getSpot("","",type,"",univ);
        if (data.success){
          var spots = data.spots;
          var markerSet = []//マーカーのリスト
          spots.forEach(spot => {
             var marker =  L.marker([spot.y, spot.x]).on('click', this.markerClickEvent);
             marker.spot_name = spot.spot_name;
             marker.spot_id = spot.spot_id;
             marker.spot_type = spot.spot_type;
             marker.spot_picture = spot.spot_picture;
             markerSet.push(marker)
            });
            this.markers = L.layerGroup(markerSet).addTo(this.map)
          } else {
            alert('Spot does not exist.')
          }
      },

      //画面の枠組みの経緯度を取得する関数
      getWindow: function(){
        var mapframe = this.map.getBounds()
        var west = mapframe.getWest()
        var east = mapframe.getEast()
        var north = mapframe.getNorth()
        var south = mapframe.getSouth()
        console.log([west,east,north,south])
        
      },
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
        this.showDialog = true;
        this.getWindow()
        this.selectedSpotID = event.target.spot_id
      },

      //現在地アイコンを更新する関数(予定)
      locationMarker(){
        this.map.locate({ setView: true, zoom: this.zoom});
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
      setNowLocation: function(){
        this.map.locate({ setView: true, zoom: this.zoom});
        //現在地マーカーを設置
      },

      //検索ジャンルを更新するメソッド(TypeButton.vueから呼ばれる)
      search: async function(...args){
        const [type,univ] = args
        console.log(args)
        this.markers.clearLayers();
        this.marker = [];
        this.nowType = type;
        if(univ){
          await this.showSpot(type,this.user.univ);
        } else{
          await this.showSpot(type,"");
        }

      },
      closeDialog() {
        this.showDialog = false;
      }
    },

    //画面読み込み時の関数
    mounted:async function() {
      if(this.$store.state.userData!=null){
        this.user.username = this.$store.state.userData.username;
        this.user.email = this.$store.state.userData.email;
        this.user.password = this.$store.state.userData.password;
        this.user.univ = this.$store.state.userData.university;
      }
      //Mapオブジェクトの生成
      this.map = L.map('map',{zoom: 10,maxZoom: 18})
      .addLayer(
        L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy <a href="https://openstreetmap.org">OpenStreetMap</a>'
        })
      );

      //初期位置を現在地に
      this.map.locate({ setView: true, zoom:this.zoom});

      //現在地マーカーを設置(予定)
        //this.map.on("locationfound",this.locationMarker);
      //spot表示
      this.showSpot(this.nowType,"");
    }, 
    //現在地追跡のために利用(予定)
    watch: {
    }
}