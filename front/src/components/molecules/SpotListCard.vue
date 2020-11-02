<template>
  <v-app>
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
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            
          >
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              link
              @click="change(index)"
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
            <v-card max-width="400" >
              <!-- カード画像 -->
              <v-img
                :src="card.src"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
              </v-img>
              
              <v-card-actions>
                
                <v-toolbar-title
                    class="px-1"
                    text
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
  </v-app>
</template>
<script>

export default {
  
  props: {
    color: String,
    list: null,
    user: null
  },

  data: () => ({
    spot: [],
    select: 2, //The default is a recommended spot.
    drawer: false,
    items: [
        { title: 'いいね！したスポット', icon: 'mdi-home-city' },
        { title: '作成スポット', icon: 'mdi-account' },
        { title: 'おすすめスポット', icon: 'mdi-account-group-outline' },
    ],
    mini: true,
    group: null
  }),
  mounted() {
    this.spot = this.list
  },
  methods:  {
    change: function(i) {
      // let name2 = items[index].title
      console.log(i)
      this.select = i
      this.spot = [];
      if(i==0){
        this.GoodSpot()
      }else if(i==1){
        this.CreatedSpot()
      }else if(i==2){
        this.spot = this.list
      }
    },
    CreatedSpot: function () {  
      let j = 0
      for (let i = 0; i < this.list.length; i++){
        if (this.list[i].user_id==this.user.user_id){
          this.spot[j] = this.list[i]
          j++;
        }
      }
    },
    GoodSpot: function () {  
      let j = 0
      for (let i = 0; i < this.list.length; i++){
        for (let k = 0; k < this.list[i].review.length; k++){
          if (this.list[i].review[k].user_id==this.user.user_id){
            this.spot[j] = this.list[i]
            j++;
            continue;
          }
        }
      }
    }
  }

  
};
</script>
<style scoped lang="scss">
.value-content {
  display: inline-block;
  margin: 40px 0 40px 40px;
  height: 130px;
  width: 350px;
  background-color: white;
  border: 0 solid #aaa;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 2px #ccc;
  padding: 15px;
}
</style>