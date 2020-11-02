<template>

  <div>
    <header class=header>
      <h2>ユーザープロファイル</h2>

      <v-container width=50>
        <v-row >
          <v-col>
            <v-layout justify-center>
              <v-avatar size="200">
                <img src="@/assets/pose_kuyashii_man.png">
              </v-avatar>
            </v-layout>
          </v-col>

          <v-col>          
            <a>ユーザー名</a>
            <h1>{{ user.name }}</h1>
            <router-link to="/user/edit">edit</router-link>
          </v-col>
        </v-row>
      </v-container>
    </header>
 
    <main class=main>
      <v-container fluid>
        <SpotListCard 
          v-bind:list="spot"
          v-bind:user="user"
          color="green"
        ></SpotListCard>
      </v-container>
    </main>
  </div>

</template>

<script>

import SpotListCard from "./molecules/SpotListCard.vue";

export default {

  components: {
    SpotListCard
  },
  data() {
    return {
      user: {
        name: 'タカタ',
        user_id: '000000'
      },
      selectedItem: 1,
      spot: [
        {
          name: 'マクドナルド',
          id: '000000',
          type: 'restaurant',
          user_id: '000000',
          username: 'asada',
          good: 123,
          src: require("@/assets/Mac.jpg"),
          flex: 4,
          review:[
            { user_id:'000000' },
            { user_id:'000002' }
          ]
        },
        {
          name: 'モスバーガー',
          id: '000001',
          type: 'restaurant',
          username: 'takata',
          user_id: '000001',
          good: 150,
          src: require('@/assets/mos.png'),
          flex: 6,
          review:[
            { user_id:'000000' },
            { user_id:'000002' }
          ]
        },      
        {
          name: 'KFC',
          id: '000002',
          type: 'restaurant',
          user_id: '000002',
          username: 'matsuo',
          good: 121,
          src: require('@/assets/KFC.jpg'), 
          flex: 6,
          review:[
            { user_id:'000000' },
            { user_id:'000002' }
          ]
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
  padding: 0px 20px 0px 20px;
}

.side {
  /* 左側に固定 */
  // padding: 0px 0px 0px 0px;
  float: left;
}
</style>