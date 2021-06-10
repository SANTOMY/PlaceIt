import {serverIP} from './requestConfig';

async function uploadProfileImage(imageFile, userId){
    const url = serverIP + '/upload/profile-image/' + userId;
    try{
        const formData = new FormData();
        formData.append("file", imageFile);

        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            body: formData
        });
        return await reponse.json();
    }catch(exception){
        return{success:false, data:exception};
    }
}

async function getProfileImage(userId){
    const url = serverIP + '/upload/profile-image/' + userId;
    try{
        let response = await fetch(url,);
        let responseJson = await response.json();
        return {success:true, data:responseJson.image[0]}
    } catch(exception){
        return {success:false, data:exception};
    }
}

async function uploadSpotImage(imageFile, spotId){
    const url = serverIP + '/upload/spot-image/' + spotId;
    try{
        const formData = new FormData();
        console.log(imageFile)
        formData.append("file", imageFile);

        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            body: formData
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

async function getSpotImage(spotId){
    const url = serverIP + '/upload/spot-image/' + spotId;
    console.log(url)
    try{
        let response = await fetch(url,);
        let responseJson = await response.json();
        const images = responseJson.data
        return {success:true, data:images}
    } catch(exception){
        console.log(exception);
        return {success:false};
    }
}

async function deleteSpotImage(spotId){
    const url = serverIP + '/upload/spot-image/' + spotId;
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
 
export {uploadProfileImage, getProfileImage, uploadSpotImage, getSpotImage, deleteSpotImage}