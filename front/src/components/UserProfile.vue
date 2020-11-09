<template>
    <v-container>
      <h1>ユーザープロファイル</h1>
      <v-dialog v-model="dialog" width=500>
          <UserEdit 
            @close="FromUserEdit"
            v-bind:user="user"
            ref="child"
          >
          </UserEdit>
      </v-dialog>
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
            <v-title>ユーザー名</v-title>
            <h1>{{ user.name }}</h1>

            <v-btn
              v-model="editer"
              @click="editProfile"
            >
              edit
            </v-btn>
            <v-spacer></v-spacer>
            <router-link to="/user/edit">edit</router-link>
          </v-col>
        </v-row>
      </v-container>
    
      <v-container fluid class="px-20">
        <SpotListCard 
          v-bind:spot_list="spot"
          v-bind:user_list="user"
          color="green"
        ></SpotListCard>
      </v-container>

    </v-container>


</template>

<script>

import SpotListCard from "./molecules/SpotListCard.vue";
import UserEdit from "./UserEdit2.vue";


export default {

  components: {
    SpotListCard,
    UserEdit
  },
  data() {
    return {
      editer: false,

      dialog: false,
      user: {
        name: 'タカタ',
        user_id: '000000',
        mail: 'takata@takata.com',
        password: 'takata',
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
            { user_id:'000001' }
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
            { user_id:'000001' },
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
            { user_id:'000002' },
            { user_id:'000000' }
          ]
        }      
      ]
    }
  },
  methods:  {
    editProfile: function() {
      this.dialog = true
      this.$refs.child.$emit('initialState')
    },
    FromUserEdit: function(value){
      console.log(this.editer)
      console.log(value)
    
      if(value.email_email==true){
        this.user.mail=value.email_edit
      }
      if(value.edit_password == true){
        this.user.password=value.password_edit
      }
      if(value.username != this.user.name){
        this.user.name=value.username
      }      
      console.log(this.user.name,this.user.mail,this.user.password)
      
      this.dialog = false

    }
  }
};
</script>
