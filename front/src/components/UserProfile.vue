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

        <v-container width=50 class="px-16">
            <v-row>
                <v-col>
                    <v-layout justify-center>
                        <v-avatar size="200">
                            <img v-bind:src="user.src">
                        </v-avatar>
                    </v-layout>
                </v-col>

                <v-col>
                    ユーザー名
                    <h1>{{ user.name }}</h1>
                    
                        <v-spacer></v-spacer>
                        <v-btn
                            v-model="editer"
                            @click="editProfile"
                        >
                        edit
                        </v-btn> 
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
import UserEdit from "./UserEdit.vue";


export default {

    components: {
        SpotListCard,
        UserEdit
    },
    data() {
        return {
            editer: false,
            dialog: false,
            user: { // ユーザー仮データ
                name: 'タカタ',
                user_id: '000000',
                mail: 'takata@takata.com',
                password: 'takata',
                src: require('@/assets/pose_kuyashii_man.png')
            },
            spot: [ // spot仮データ
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
            // UserEdit.vueが起動する関数（修正完了時or修正キャンセル時）
            console.log(this.editer)
            console.log(value)
          
            if(value.edit_email==true){
                this.user.mail=value.email_edit
            }
            if(value.edit_password == true){
                this.user.password=value.password_edit
            }
            if(value.edit_username == true){
                this.user.name=value.username
            }      
            console.log(this.user.name,this.user.mail,this.user.password)
            
            this.dialog = false

        }
    }
};
</script>
