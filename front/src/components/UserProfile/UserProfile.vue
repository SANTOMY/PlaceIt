<template>
<!-- ローディング画面 -->
    <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar-three-line, image"
        class="mx-auto"
    ></v-skeleton-loader>
    <v-container v-else>
        <h1>ユーザープロファイル</h1>
<!-----------------------修正処理(修正ボタンを押すと起動)------------------------------------------------>
        <v-dialog v-model="dialogEdit" width=500>
            <UserEdit 
                @close="closeUserEdit"
                v-bind:user="user"
                ref="child"
            >
            </UserEdit>
        </v-dialog>
<!-----------------------ユーザー写真------------------------------------------------->        
        <v-row>
            <v-col>
                <v-layout justify-center>
                    <v-avatar size="200">
                        <img v-bind:src="user.src">
                    </v-avatar>
                </v-layout>
                <avatar-register @submit="editAvatarImage"/>
            </v-col>
<!-----------------------ユーザー名とプロフィール修正ボタン------------------------->
            <v-col>
                ユーザー名
                <h1>{{ user.username }}</h1>
                所属大学
                <h1>{{ user.university }}</h1>
                
                    <v-spacer></v-spacer>
                    <v-btn
                        v-model="editer"
                        @click="editProfile"
                    ><!-------editerのtrue/false変更され、editProfile()が起動するボタン----->
                    edit
                    </v-btn> 
            </v-col>
        </v-row>
<!----------------------スポットリストカード------------------------------------------------->
        <SpotListCard 
            v-bind:spot_list="spot"
            v-bind:user_list="user"
            v-bind:my_spot_list="my_spot"
            v-bind:good_spot_list="good_spot"
            color="green"
        ></SpotListCard>
    </v-container>
</template>

<script>

import SpotListCard from "./SpotListCard.vue";
import UserEdit from "./UserEdit.vue";
import {uploadProfileImage, getProfileImage} from "../../routes/imageRequest"
import AvatarRegister from "./AvatarRegister.vue"
import {getSpot} from '../../routes/spotRequest'
import {average} from '../../routes/reviewRequest';
import {getReviewByUserId} from '../../routes/reviewRequest';
// import {SpotExampleData} from "../share/SpotExampleData";
import {getSpotImage} from "../../routes/imageRequest"

export default {

    components: {
        SpotListCard,
        UserEdit,
        AvatarRegister
    },
    data() {
        return {
            editer: false, // User profile edit UI ON/OFF(true/false)
            dialogEdit: false,
            user: { // ユーザー仮データ
                user_id: 'default_id',
                username: this.$store.state.userData.userName,
                email: this.$store.state.userData.email,
                password: this.$store.state.userData.password,
                university: this.$store.state.userData.university,
                src: require('@/assets/default-icon.jpeg')
            },
            spot: [], // SpotExampleData(),
            my_spot: [
                // 自分の作成したスポット
                // required attribute: name, src, good
            ],
            spot_to_show: [
                // my_spotのうち表示するスポット
                // いまはまだ必要ないけど，スポット投稿数が多くなると必要かも
            ],
            good_spot: [
                // 自分が評価したスポット
            ],
            isLoading: true,
            show_count: 0,
        }
    },
    mounted: function(){
        // call getUser(email) from .vue file:
        this.show_count = 0

        this.getSpotByUserId( this.$store.state.userData.userId )
            .then( () =>{
                this.getLatestSpots( 0, 28 )
                // this.show_count += 1
                console.log('my_spot length',this.my_spot.length)
        })

        this.getSpotYouReviewed( this.$store.state.userData.userId )
            .then( () =>{
                // this.show_count += 1
                console.log('good_spot length',this.good_spot.length)
            })

        this.getRecommendedSpots( this.user.university )
            .then( () =>{
                // this.show_count += 1
                console.log('spot length',this.spot.length)
            })

        getProfileImage(this.$store.state.userData.userId)
            .then(result => {
                if(!result.success) return;
                // console.log(result.data.image);
                this.user.src = "data:image/jpeg;base64," + result.data.image;
            })

    },
    methods:  {
        editProfile: function() {
            this.dialogEdit = true
        },
        closeUserEdit: function(){          
            this.dialogEdit = false
        },
        editAvatarImage: function(image) {
            this.user.src = image;
            const imageFile = this.createImageFile(image, "hoge.jpeg"); //DB保存時に別の名前に変えられるから適当な名前にしてる
            uploadProfileImage(imageFile, this.$store.state.userData.userId)
        },

        createImageFile: function(base64image, name) {
            var bin = atob(base64image.replace(/^.*,/, ''));
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
        return new File([buffer.buffer], name, {type: "image/jpeg"});
        },
        getSpotByUserId: async function(user_id){
            return getSpot('', '', '', user_id, '').then(result => {
                const all = result.spots.length;
                var added = 0;
                for( var spt of result.spots ){
                    const spt_id = spt.spot_id;
                    const name = spt.spot_name;

                    // レビューの計算
                    var scores = [];
                    for( var rev of result.review ){
                        if( spt.spot_id == rev.spot_id ){
                            scores.push( rev.score );
                        }
                    }
                    const good = Math.round( 10 * average( scores ) ) / 10;

                    getSpotImage( spt_id ).then( ( result ) =>{
                        if( result.success && result.data != undefined ){
                            const src = "data:image/jpeg;base64," + result.data[0].image
                            this.my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        }else{
                            const src = require( "@/assets/noimage.png" );
                            this.my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        }
                    } ).catch((exception)=>{
                        console.log( "Error in getSpotImage: ", exception )
                        const src = require( "@/assets/noimage.png" );
                        this.my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                    }).finally(()=>{
                        added += 1;
                        if( added >= all ){
                            this.my_spot.sort( function( a, b ){
                                var good1 = a.good;
                                var good2 = b.good;
                                if( good1 > good2 ){
                                    return -1
                                }else{
                                    return 1
                                }
                            } )
                            this.show_count += 1
                        }
                    })
                }
            }).catch((exception) => {
                console.log( "Error in getSpotByUserId: ", exception );
            })
        },
        getSpotYouReviewed: async function( user_id ){
            return getReviewByUserId( user_id ).then( result => {
                var reviewd_spot_ids = new Set()
                for( let rev of result.review ){
                    reviewd_spot_ids.add( rev.spot_id );
                }
                const all = reviewd_spot_ids.size;
                var added = 0;
                for( let reviewd_spot_id of reviewd_spot_ids ){
                    getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                        const spt = result.spots[ 0 ];
                        const spt_id = spt.spot_id;
                        const name = spt.spot_name;
                        
                        // レビューの計算
                        var scores = [];
                        for( var rev of result.review ){
                            if( spt.spot_id == rev.spot_id ){
                                scores.push( rev.score );
                            }
                        }
                        const good = Math.round( 10 * average( scores ) ) / 10;

                        getSpotImage( spt_id ).then( ( result ) =>{
                            if( result.success && result.data != undefined ){
                                const src = "data:image/jpeg;base64," + result.data[0].image
                                this.good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                            }else{
                                const src = require( "@/assets/noimage.png" );
                                this.good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                            }
                        } ).catch((exception)=>{
                            console.log( "Error in getSpotImage: ", exception )
                            const src = require( "@/assets/noimage.png" );
                            this.good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        }).finally(()=>{
                            added += 1;
                            if( added >= all ){
                                this.good_spot.sort( function( a, b ){
                                    var good1 = a.good;
                                    var good2 = b.good;
                                    if( good1 > good2 ){
                                        return -1
                                    }else{
                                        return 1
                                    }
                                } )
                                this.show_count += 1
                            }
                        })

                    } ).catch((exception) => {
                        console.log( "Error in getReviewByUserId: ", exception );
                    })
                }
            } ).catch((exception) => {
                console.log( "Error in getSpotYouReviewed: ", exception );
            })
        },
        shuffleArray: function( array ){
            var newArray = [];

            while ( array.length > 0 ) {
                var n = array.length;
                var k = Math.floor( Math.random() * n );

                newArray.push( array[ k ] );
                array.splice( k, 1 );
            }

            return newArray;
        },
        getRecommendedSpots: function( user_univ ){
            return getSpot('', '', '', '', user_univ).then( result => {
                var sampled = this.shuffleArray( result.spots )//.slice( 0, 3 )
                console.log( "recommendedSpots:", sampled )
                const all = sampled.length;
                var added = 0;
                for( var spt of sampled ){
                    const spt_id = spt.spot_id;
                    const name = spt.spot_name;

                    // レビューの計算
                    var scores = [];
                    for( var rev of result.review ){
                        if( spt.spot_id == rev.spot_id ){
                            scores.push( rev.score );
                        }
                    }
                    const good = Math.round( 10 * average( scores ) ) / 10;

                    getSpotImage( spt_id ).then( ( result ) =>{
                        if( result.success && result.data != undefined ){
                            const src = "data:image/jpeg;base64," + result.data[0].image
                            this.spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        }else{
                            const src = require( "@/assets/noimage.png" );
                            this.spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        }
                    } ).catch((exception)=>{
                        console.log( "Error in getSpotImage: ", exception )
                        const src = require( "@/assets/noimage.png" );
                        this.spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                    }).finally(()=>{
                        added += 1;
                        if( added >= all ){
                            this.spot.sort( function( a, b ){
                                var good1 = a.good;
                                var good2 = b.good;
                                if( good1 > good2 ){
                                    return -1
                                }else{
                                    return 1
                                }
                            } )
                            this.spot = this.spot.slice( 0, 6 )
                            this.show_count += 1
                        }
                    })
                }
            })
        },
        getLatestSpots: function( left = 0, right ){ //スポットが多すぎるときの処理。
            // TODO: 他のスポットにも対応
            console.log( "latestSpots", ( this.my_spot ).slice( left, right ) )
            this.spot_to_show = ( this.my_spot ).slice( left, right )
        }
    },
    watch:  {
        show_count: function() {
            if(this.show_count!=3) return;
            if(this.show_count==3) this.isLoading=false
        }

    }
};
</script>
