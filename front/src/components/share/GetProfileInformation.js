import {getSpot} from '../../routes/spotRequest';
import { average } from '../../routes/reviewRequest';
import { getReviewBySpotId, getReviewByUserId } from '../../routes/reviewRequest';
import {getSpotImage} from "../../routes/imageRequest"

async function getSpotByUserId (user_id){
    return getSpot('', '', '', user_id, '').then(result => {
        var my_spot = []
        for( var spt of result.spots ){
            const spt_id = spt.spot_id;
            const name = spt.spot_name;

            // レビューの計算
            getReviewBySpotId(spt_id).then(result => {
                const scores = [];
                for (var rev of result.review) {
                    scores.push(rev.score);
                }

                const good = Math.round(10 * average(scores)) / 10;
                getSpotImage(spt_id).then((result) => {
                    if (result.success && result.data != undefined) {
                        const src = "data:image/jpeg;base64," + result.data[0].image
                        my_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                    } else {
                        const src = require("@/assets/noimage.png");
                        my_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                    }
                }).catch((exception) => {
                    console.log("Error in getSpotImage: ", exception)
                    const src = require("@/assets/noimage.png");
                    my_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                })
            }).catch((exception) => {
                console.log("Error in getReviewBySpotId: ", exception)
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

        for( let reviewd_spot_id of reviewd_spot_ids ){
            getSpot( reviewd_spot_id, '', '', '', '' ).then( result => {
                const spt = result.spots[ 0 ];
                const spt_id = spt.spot_id;
                const name = spt.spot_name;
                // const good = null;
 
                // レビューの計算
                getReviewBySpotId(spt_id).then(result => {
                    const scores = [];
                    for (var rev of result.review) {
                        scores.push(rev.score);
                    }
                    const good = Math.round(10 * average(scores)) / 10;
                    getSpotImage(spt_id).then((result) => {
                        if (result.success && result.data != undefined) {
                            const src = "data:image/jpeg;base64," + result.data[0].image
                            good_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                        } else {
                            const src = require("@/assets/noimage.png");
                            good_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                        }
                    }).catch((exception) => {
                        console.log("Error in getSpotImage: ", exception)
                        const src = require("@/assets/noimage.png");
                        good_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                    })
                }).catch((exception => {
                    console.log("Error in getReviewBySpotId: ", exception)
                }));
            } ).catch((exception) => {
                console.log( "Error in getReviewByUserId: ", exception );
            })
        }
        return good_spot
    } ).catch((exception) => {
        console.log( "Error in getSpotYouReviewed: ", exception );
    })
}

async function getRecommendedSpot(user_univ){
    return getSpot('', '', '', '', user_univ).then(result => {
        var recommended_spot = []
        var step = 0;
        const goal = result.spots.length;
        for( var spt of result.spots ){
            const spt_id = spt.spot_id;
            const name = spt.spot_name;

            // レビューの計算
            getReviewBySpotId(spt_id).then(result => {
                const scores = [];
                for (var rev of result.review) {
                    scores.push(rev.score);
                }

                const good = Math.round(10 * average(scores)) / 10;
                getSpotImage(spt_id).then((result) => {
                    if (result.success && result.data != undefined) {
                        const src = "data:image/jpeg;base64," + result.data[0].image
                        recommended_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                    } else {
                        const src = require("@/assets/noimage.png");
                        recommended_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                    }
                }).catch((exception) => {
                    console.log("Error in getSpotImage: ", exception)
                    const src = require("@/assets/noimage.png");
                    recommended_spot.push({ "spotId": spt_id, "name": name, "src": src, "good": good });
                })
            }).catch((exception) => {
                console.log("Error in getReviewBySpotId: ", exception)
            }).finally(()=>{
                step += 1;
                if( step >= goal ){
                    return recommended_spot
                }
            })
        }
    }).catch((exception) => {
        console.log( "Error in getSpotByUserId: ", exception );
    })
}

async function getLatestSpots( left = 0, right ,spot){ //スポットが多すぎるときの処理。
    // TODO: 他のスポットにも対応
    console.log( "latestSpots", ( spot ).slice( left, right ) )
    return ( spot ).slice( left, right )
}

export {getSpotByUserId,getSpotYouReviewed,getRecommendedSpot,getLatestSpots}