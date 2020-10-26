<template>

  <div class=top>

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
      spot: [
        {
          name: 'マクドナルド',
          id: '000000',
          tyoe: 'restaurant',
          user_id: '000000',
          username: 'asada',
          good: 123
        },
        {
          name: 'モスバーガー',
          id: '000001',
          tyoe: 'restaurant',
          username: 'takata',
          user_id: '000000',
          good: 150
        },      
        {
          name: 'KFC',
          id: '000002',
          tyoe: 'restaurant',
          user_id: '000000',
          username: 'matsuo',
          good: 121
        }      
      ]
    }
  },
};
</script>
<style scoped lang="scss">
.top {
  padding: 0px 20px 0px 20px;
}
</style>