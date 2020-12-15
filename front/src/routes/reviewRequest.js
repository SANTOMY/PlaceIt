import {serverIP} from './requestConfig';

async function saveReview(spotId, comment, score, userId){
    const url = serverIP + '/review/saveReview';
    console.log({spotId:spotId, comment:comment, score:score, userId:userId})
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({spotId:spotId, comment:comment, score:score, userId:userId})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

export {saveReview};