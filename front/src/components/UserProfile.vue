<template>
    <v-container>
      <h1>ユーザープロファイル</h1>

      <v-container width=50 class="px-20">
        <v-row >
          <v-col>
            <v-layout justify-center>
              <v-avatar size="200">
                <img v-bind:src="user.src">
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
    
      <v-container fluid class="px-20">
        <SpotListCard 
          v-bind:list="spot"
          v-bind:user="user"
          color="green"
        ></SpotListCard>
      </v-container>

    </v-container>


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
        user_id: '000000',
        src: require('@/assets/pose_kuyashii_man.png')
      },
      spot: [
        {
          name: 'マクドナルド',
          id: '000000',
          type: 'restaurant',
          user_id: '000000',
          username: 'asada',
          good: 123,
          src: require("@/assets/Mac.jpg"),
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
