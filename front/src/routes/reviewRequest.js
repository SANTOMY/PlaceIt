import {serverIP} from './requestConfig';

async function saveReview(spotId, comment, score, userId, score1, score2, score3, score4, score5){
    const url = serverIP + '/review/saveReview';
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({spotId:spotId, comment:comment, score:score, userId:userId, score1:score1, score2:score2, score3:score3, score4:score4, score5:score5})
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

export {saveReview, getReviewBySpotId};
