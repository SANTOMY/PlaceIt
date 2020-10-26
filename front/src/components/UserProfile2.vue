<template>

  <div>
    <header class=header>
      <h2>ユーザープロファイル</h2>
      <router-link to="/Map">Go to Map</router-link>
      <br>
      <router-link to="/login">Log out</router-link>

      <v-container width=50>
        <v-row >
          <v-col>
            <v-layout justify-center>
              <v-avatar size="200">
                <img src="../assets/pose_kuyashii_man.png">
              </v-avatar>
            </v-layout>
          </v-col>

          <v-col>          
            <a>ユーザー名</a>
            <h1>タカタ</h1>
            <router-link to="/user/edit">edit</router-link>
          </v-col>
        </v-row>
      </v-container>
    </header>
 

  
    <side class=side>
      <v-card
        class="mx-auto"
        max-width="130"
        
        tile
      >
        <v-list dense>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </side>

    <main class=main>
      <v-container fluid="true">
        <v-row>
          <v-col>
            <spot-list-card 
              name="いいね！したスポット" 
              v-bind:list="spot"
              color="green"
            ></spot-list-card>
          </v-col>

          <v-col>
            <spot-list-card 
              name="作成スポット" 
              v-bind:list="spot"
              color="blue"
            ></spot-list-card>
          </v-col>
        </v-row>
      </v-container>
    </main>
  </div>

</template>

<script>

import SpotListCard from "./molecules/SpotListCard";

export default {

  components: {
    SpotListCard
  },
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      spot: [
        {
          name: 'マクドナルド',
          id: '000000',
          tyoe: 'restaurant',
          user_id: '000000',
          username: 'asada',
          good: 123,
          photo: "../../assets/pose_kuyashii_man.png"
        },
        {
          name: 'モスバーガー',
          id: '000001',
          tyoe: 'restaurant',
          username: 'takata',
          user_id: '000000',
          good: 150,
          photo: '../../assets/pose_kuyashii_man.png'
        },      
        {
          name: 'KFC',
          id: '000002',
          tyoe: 'restaurant',
          user_id: '000000',
          username: 'matsuo',
          good: 121,
          photo: '../../assets/pose_kuyashii_man.png'
        }      
      ]
    }
  },
};
</script>
<style scoped lang="scss">
.header {
  padding: 0px 20px 0px 20px;
}

.main {
  padding: 0px 20px 0px 180px;
}

.side {
  /* 左側に固定 */
  // padding: 0px 0px 0px 0px;
  float: left;
}
</style>