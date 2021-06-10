import {getSpot} from '../../routes/spotRequest';
// import {average} from '../../routes/reviewRequest';
import {getReviewByUserId} from '../../routes/reviewRequest';
import {getSpotImage} from "../../routes/imageRequest"

async function getSpotByUserId (user_id){
    return getSpot('', '', '', user_id, '').then(result => {
        var my_spot = []
        for( var spt of result.spots ){
            const spt_id = spt.spot_id;
            const name = spt.spot_name;
            const type = spt.spot_type;
            const usr_id = spt.user_id;

            // レビューの計算
            //TODO : レビュー平均値表示
            // var scores = [];
            // for( var rev of result.review ){
            //     if( spt.spot_id == rev.spot_id ){
            //         scores.push( rev.score );
            //     }
            // }
            // const good = Math.round( 10 * average( scores ) ) / 10;
            getSpotImage( spt_id ).then( ( result ) =>{
                if( result.success && result.data != undefined ){
                    const src = "data:image/jpeg;base64," + result.data[0].image
                    //TODO : FIX
                    // my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                    my_spot.push({ "spotId": spt_id, "spotName": name, "spotType":type,"userId":usr_id, "src": src });
                }else{
                    const src = require( "@/assets/noimage.png" );
                    //TODO : FIX
                    // my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                    my_spot.push({ "spotId": spt_id, "spotName": name, "spotType":type,"userId":usr_id, "src": src });
                }
            }).catch((exception)=>{
                console.log( "Error in getSpotImage: ", exception )
                const src = require( "@/assets/noimage.png" );
                //TODO : FIX
                // my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                my_spot.push({ "spotId": spt_id, "spotName": name, "spotType":type,"userId":usr_id,"src": src });
            })
        }
        return my_spot
    }).catch((exception) => {
        console.log( "Error in getSpotByUserId: ", exception );
    })
}

async function getSpotYouReviewed( user_id ){
    return getReviewByUserId( user_id ).then( result => {
        var reviewd_spot_ids = new Set()
        var good_spot = []
        for( let rev of result.review ){
            reviewd_spot_ids.add( rev.spot_id );
        }
        // const all = reviewd_spot_ids.size;
        // var added = 0;
        for( let reviewd_spot_id of reviewd_spot_ids ){
            getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                const spt = result.spots[ 0 ];
                const spt_id = spt.spot_id;
                const name = spt.spot_name;
                const type = spt.spot_type;
                const usr_id = spt.user_id;
 
                // レビューの計算
                // var scores = [];
                // for( var rev of result.review ){
                //     if( spt.spot_id == rev.spot_id ){
                //         scores.push( rev.score );
                //     }
                // }
                // const good = Math.round( 10 * average( scores ) ) / 10;
                
                getSpotImage( spt_id ).then( ( result ) =>{
                    if( result.success && result.data != undefined ){
                        const src = "data:image/jpeg;base64," + result.data[0].image
                        // good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        good_spot.push({ "spotId": spt_id, "spotName": name, "spotType":type,"userId":usr_id, "src": src });
                    }else{
                        const src = require( "@/assets/noimage.png" );
                        // good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                        good_spot.push({ "spotId": spt_id,"spotName": name, "spotType":type,"userId":usr_id, "src": src });
                    }
                } ).catch((exception)=>{
                    console.log( "Error in getSpotImage: ", exception )
                    const src = require( "@/assets/noimage.png" );
                    // good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
                    good_spot.push({ "spotId": spt_id, "spotName": name, "spotType":type,"userId":usr_id, "src": src });
                })
            } ).catch((exception) => {
                console.log( "Error in getReviewByUserId: ", exception );
            })
        }
        return good_spot
    } ).catch((exception) => {
        console.log( "Error in getSpotYouReviewed: ", exception );
    })
}

async function getLatestSpots( left = 0, right ,spot){ //スポットが多すぎるときの処理。
    // TODO: 他のスポットにも対応
    console.log( "latestSpots", ( spot ).slice( left, right ) )
    return ( spot ).slice( left, right )
}

export {getSpotByUserId,getSpotYouReviewed,getLatestSpots}