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

async function getSpot(keywords){
    const ret = encodeURI(keywords)
    const url = serverIP + '/user/getSpot/' + ret;
    try{
        let response = await fetch(url,);
        let responseJson = await response.json();
        //Should probably use status code instead of this
        if (responseJson.success){
            return responseJson.data;
        } else{
            return responseJson.error;
        }

    } catch(exception){
        console.log(exception);
        return {success:false, data:exception};
    }
}

export {saveSpot, getSpot};