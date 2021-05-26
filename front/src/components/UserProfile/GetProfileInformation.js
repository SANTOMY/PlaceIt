import {getSpot} from '../../routes/spotRequest';
import {average} from '../../routes/reviewRequest';
import {getReviewByUserId} from '../../routes/reviewRequest';

async function getSpotByUserId (user_id){
    return getSpot('', '', '', user_id, '').then(result => {
        var my_spot = []
        for( var spt of result.spots ){
            var spt_id = spt.spot_id;
            var name = spt.spot_name;
            // TODO: to get images from DB
            var src = require( "@/assets/Mac.jpg" );
            if( Math.random() >= 0.5 ){
                src = require('@/assets/mos.png');
            }
            // レビューの計算
            var scores = [];
            for( var rev of result.review ){
                if( spt.spot_id == rev.spot_id ){
                    scores.push( rev.score );
                }
            }
            var good = Math.round( 10 * average( scores ) ) / 10;
            my_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
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
        for( let reviewd_spot_id of reviewd_spot_ids ){
            getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                var spt = result.spots[ 0 ];
                var spt_id = spt.spot_id;
                var name = spt.spot_name;
                // TODO: to get images from DB
                var src = require( "@/assets/Mac.jpg" );
                if( Math.random() >= 0.5 ){
                    src = require('@/assets/mos.png');
                }
                // レビューの計算
                var scores = [];
                for( var rev of result.review ){
                    if( spt.spot_id == rev.spot_id ){
                        scores.push( rev.score );
                    }
                }
                var good = Math.round( 10 * average( scores ) ) / 10;
                good_spot.push( { "spotId": spt_id, "name": name, "src": src, "good": good } );
            } ).catch((exception) => {
                console.log( "Error in getReviewByUserId: ", exception );
            })
        }
        return good_spot
    } ).catch((exception) => {
        console.log( "Error in getSpotYouReviewed: ", exception );
    })
}

export {getSpotByUserId,getSpotYouReviewed}