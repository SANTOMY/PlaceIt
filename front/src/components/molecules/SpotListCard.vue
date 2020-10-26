<template>
  <v-app>
    <v-card v-bind:class="color + ' lighten-4'" >

      <v-toolbar
        :color="color"
        dark
      >

        <v-app-bar-nav-icon @click="drawer = true">
        </v-app-bar-nav-icon>

        <v-toolbar-title>{{name}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

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
            v-btn
          >
            <v-list-item
              v-for="(item, index) in items"
              :key="item.title"
              link
              @click="change(index)"
            >
              
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in list"
            :key="card"
            :cols="card.flex"
          >
            <!-- <v-btn v-card> -->

      
            <v-card>
              <v-img
                src="@/assets/pose_kuyashii_man.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>

                <v-spacer></v-spacer>

                <v-icon class="mr-1">mdi-heart</v-icon>

                <span class="subheading mr-2">{{card.good}}</span>

              </v-card-actions>

            </v-card>
            <!-- </v-btn> -->
          </v-col>
        </v-row>
      </v-container>



   
    </v-card>  
  </v-app>
</template>
<script>
// import CardTitle from "../atoms/CardTitle";
// import CardNumber from "../atoms/CardNumber";
export default {
  components: {

  },
  
  props: {
    name: String,
    color: String,
    'list':{
      name: String,
      good: Number
    }
  },

  data: () => ({
    drawer: false,
    items: [
        { title: 'いいね！したスポット', icon: 'mdi-home-city' },
        { title: '作成スポット', icon: 'mdi-account' },
        { title: 'おすすめスポット', icon: 'mdi-account-group-outline' },
    ],
    mini: true,
    group: null
  }),

  change(i) {
    // let name2 = items[index].title
    console.log(i)

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