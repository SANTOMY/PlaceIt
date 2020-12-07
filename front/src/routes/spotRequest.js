import {serverIP} from './requestConfig';

async function saveSpot(spotName, x, y, picture, spotType, userId, comment, score){
    const url = serverIP + '/spot/saveSpot';
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({spotName:spotName, x:x, y:y, picture:picture, spotType:spotType, userId:userId, comment:comment, score:score})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

async function getSpot(spotId, spotName, spotType, userId){
    const url_row = serverIP + '/spot/getSpot?' + "spotId=" + spotId + "&spotName=" + spotName  + "&spotType=" + spotType + "&userId" + userId;
    //TODO: "&xMax=" + xMax + "&xMin=" + xMin + "&yMax" + yMax + "&yMin" + yMin
    const url = encodeURI(url_row)
    try{
        let response = await fetch(url,);
        let responseJson = await response.json();
        //Should probably use status code instead of this
        if (responseJson.success){
            return {spots:responseJson.spots, review:responseJson.review};
        } else{
            return responseJson.error;
        }

    } catch(exception){
        console.log(exception);
        return {success:false, data:exception};
    }
}

export {saveSpot, getSpot};