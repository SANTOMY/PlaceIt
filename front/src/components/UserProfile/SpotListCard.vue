<template>
  <!-- カードリストの大枠 -->
  <v-card v-bind:class="color + ' lighten-4'" >
    
    <!-- カードのヘッダー部分 -->
    <v-toolbar
      :color="color"
      dark
    >

      <v-app-bar-nav-icon @click="drawer = true">
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{items[select].title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- サイドバー作成 -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          
          active-class="deep-purple--text text--accent-4" 
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="ChangeCategory(index)"
            v-model="drawer"
          >
            
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- スポット表示 -->
    <v-container fluid>
      <v-row dense justify="center">
        <v-col
          v-for="(card, index) in spot"
          :key="index"
            
        >

          <!-- サブカード -->
          <v-card max-width="400" 
            @click="spotInformationPage(index)"
          >
            <!-- カード画像 -->
            <v-img
              :src="card.src"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
            >
            </v-img>
            
            <v-card-actions>
              
              <v-toolbar-title
                  class="px-2"
              >
                  {{ card.name }}
              </v-toolbar-title>
              
              <v-spacer></v-spacer>

              <v-icon class="mr-1">mdi-heart</v-icon>

              <span class="subheading mr-2">{{card.good}}</span>

            </v-card-actions>
          </v-card>
        
        </v-col>
      </v-row>
    </v-container>
  
  </v-card>  

</template>
<script>

export default {
  
  props: {
    color: String,
    spot_list: null,
    user_list: null
  },

  data: () => ({
    spot: [],
    select: 2, //The default is a recommended spot.
    drawer: false,
    items: [
        { title: 'いいね！したスポット', icon: 'mdi-home-city' },
        { title: '作成スポット', icon: 'mdi-account' },
        { title: 'おすすめスポット', icon: 'mdi-account-group-outline' },
    ]
  }),
  mounted() {
    this.spot = this.spot_list
    this.user = this.user_list
  },
  methods:  {
    ChangeCategory: function(i) {
      console.log(i) // どれを選択
      this.select = i
      this.spot = [];
      if(i==0){
        this.GoodSpotSort()
      }else if(i==1){
        this.CreatedSpotSort()
      }else if(i==2){
        this.spot = this.spot_list
      }
    },
    CreatedSpotSort: function () { // 作ったスポットを表示する関数 
      let j = 0
      for (let i = 0; i < this.spot_list.length; i++){
        if (this.spot_list[i].user_id==this.user.user_id){
          this.spot[j] = this.spot_list[i]
          j++;
        }
      }
    },
    GoodSpotSort: function () { // いいね！したスポットを表示する関数
      let j = 0
      for (let i = 0; i < this.spot_list.length; i++){
        for (let k = 0; k < this.spot_list[i].review.length; k++){
          if (this.spot_list[i].review[k].user_id==this.user.user_id){
            this.spot[j] = this.spot_list[i]
            j++;
            continue;
          }
        }
      }
    },
    spotInformationPage: function(value) { // spotのカードをクリックしたときに動く関数
      console.log(this.spot_list[value].spotId) // Debug
      this.$router.push({ path: 'spot', query: { "spotId": this.spot_list[value].spotId } })
    },

  }

};
</script>