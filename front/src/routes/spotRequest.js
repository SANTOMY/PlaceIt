import {serverIP} from './requestConfig';
import { average } from './reviewRequest';

async function saveSpot(spotName, x, y, picture, spotType, userId, comment, scores, university){
    const url = serverIP + '/spot/saveSpot';
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '0.0.0.0'
            },
            body: JSON.stringify({spotName:spotName, x:x, y:y, picture:picture, spotType:spotType, userId:userId, comment:comment, score:average(scores), university:university, score1:scores[0], score2:scores[1], score3:scores[2], score4:scores[3], score5:scores[4]})
        });
        return await reponse.json();
    }catch(exception){
        return{success:false, data:exception};
    }
}

/**
 * get Spot
 * @module getSpot
 * @param {String} spotId
 * @param {String} spotName
 * @param {String} spotType - Now we can get only one spotType. TODO: modify to multilabel
 * @param {userId} userId
 * @return {spots, review} - spots is list of spot, review is list of review which connect to spot
 */
async function getSpot(spotId, spotName, spotType, userId, university){
    //TODO: "&xMax=" + xMax + "&xMin=" + xMin + "&yMax" + yMax + "&yMin" + yMin
    //TODO: encode User Id
    const queryString = '/spot/getSpot?' + "spotId=" + spotId + "&spotName=" + spotName  + "&spotType=" + spotType + "&userId=" + userId + "&university=" + university;

    const url = serverIP + queryString;
    try{
        let response = await fetch(url,);
        let responseJson = await response.json();
        //Should probably use status code instead of this
        if (responseJson.success){
            return {spots:responseJson.spots, review:responseJson.review,success:true};
        } else{
            return responseJson.error;
        }

    } catch(exception){
        return {success:false, data:exception};
    }
}

async function editSpot(spotId, spotName, spotType){
    const url = serverIP + '/spot/editSpot';
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({spotId: spotId, spotName: spotName, spotType: spotType})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

async function deleteSpot(spotId){
    const url = serverIP + '/spot/deleteSpot';
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({spotId: spotId})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

export {saveSpot, getSpot, editSpot, deleteSpot};