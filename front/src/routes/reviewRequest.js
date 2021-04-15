import {serverIP} from './requestConfig';

async function saveReview(spotId, comment, scores, userId){
    const url = serverIP + '/review/saveReview';
    console.log(userId)
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '0.0.0.0'
            },
            body: JSON.stringify({spotId:spotId, comment:comment, userId:userId, score:average(scores), 
                score1:scores[0], score2:scores[1], score3:scores[2], score4:scores[3], score5:scores[4]})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

async function getReviewBySpotId(spotId){
    const url = serverIP + '/review/getReviewBySpotId/' + spotId;

    try{
        let response = await fetch(url,);
        let responseJson = await response.json();
        //Should probably use status code instead of this
        if (responseJson.success){
            return {review:responseJson.review};
        } else{
            return responseJson.error;
        }

    } catch(exception){
        console.log(exception);
        return {success:false, review:exception};
    }
}
var sum  = function(arr) {
    var sum = 0;
    arr.forEach(function(elm) {
        sum += elm;
    });
    return sum;
};

var average = function(arr, fn) {
    return sum(arr, fn)/arr.length;
};

export {saveReview, getReviewBySpotId, average};
