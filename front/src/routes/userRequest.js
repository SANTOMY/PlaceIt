import {serverIP} from './requestConfig';

exports.register = async function(userName,email,password){
    const url = serverIP + 'user/register'

    try{
        let reponse = await fetch(url,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: userName, email: email, password: password})
        });
        return await reponse.json();
    }catch(exception){
        console.log(exception);
        return{success:false, data:exception};
    }
}