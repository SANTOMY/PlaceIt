'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const pool = con.pool;
const fileLabel = "ImageSQL"


async function uploadProfilePicture(newImage){
    const query = {
        text: 'INSERT INTO images.profile(userid, path) VALUES($1, $2)',
        values: [newImage.userId, newImage.path]
    };

    const client = await pool.connect();
    return client.query(query).then((result)=>{
        client.release();
        info(fileLabel,"Saved image: " + newImage.path);
        return {"success":true};
    }).catch((exception) => {
        client.release();
        error(fileLabel,"Error while saving image." + exception);
        return {"success":false, "data":exception}; 
    });
}


async function getProfilePicture(userId){
    const query = {
        text: `SELECT * from images.profile where userid=${userId}`
    };

    const client = await pool.connect();
    return client.query(query).then((result)=>{
        client.release();
        if (result.rowCount == 0){
            info(fileLabel,"Profile picture for this user does not exist");
            return {"success":false};
        }
        else{
            info(fileLabel,"Found image for user: " + userId);
            return {"success":true, "data": result.rows};
        }
    }).catch((exception) => {
        client.release();
        error(fileLabel,"Error while getting image." + exception);
        return {"success":false, "data":exception}; 
    });
}

module.exports = {
    uploadProfilePicture:uploadProfilePicture,
    getProfilePicture: getProfilePicture
};