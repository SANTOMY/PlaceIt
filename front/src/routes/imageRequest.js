import {serverIP} from './requestConfig';

async function uploadProfileImage(imageFile, userId){
    const url = serverIP + '/upload/profile-image/' + userId;
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

async function getProfileImage(userId){
    const url = serverIP + '/upload/profile-image/' + userId;
    try{
        let response = await fetch(url,);
        let responseBlob = await response.blob();
        return responseBlob;
    } catch(exception){
        console.log(exception);
        return {success:false, review:exception};
    }
}

export {uploadProfileImage, getProfileImage}