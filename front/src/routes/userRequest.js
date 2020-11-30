import {serverIP} from './requestConfig';

async function register(userName,email,password){
    const url = serverIP + '/user/register';
    try{
        let reponse = await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify({userName: userName, email: email, password: password})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}

async function getUser(email){
    const url = serverIP + '/user/getUserByEmail/' + email;

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

export {register,getUser};