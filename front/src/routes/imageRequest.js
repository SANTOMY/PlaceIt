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
 
export {uploadProfileImage, getProfileImage}