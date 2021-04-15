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

export {uploadProfileImage}