'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const pool = con.pool;
const fileLabel = "ImageSQL"


async function uploadProfilePicture(newImage){
    info(fileLabel,"Inside upload");
    var query;
    const client = await pool.connect();
    var userExist = await getProfilePicture(newImage.userId);
    var oldPath;
    if (userExist.success){
        info(fileLabel,"User already exist. Updating picture");
        query = {
            text: 'Update images.profile set path=$1 where userid=$2',
            values: [newImage.path,newImage.userId]
        };
        //need old picture path to delete from filesystem
        oldPath = userExist.data[userExist.data.length - 1].path

    } else{
        info(fileLabel,"Inside else statement");
        query = {
            text: 'INSERT INTO images.profile(userid, path) VALUES($1, $2)',
            values: [newImage.userId, newImage.path]
        };
    }
    console.log(query);
    return client.query(query).then((result)=>{
        info(fileLabel,"Inside query");
        console.log(query);
        client.release();
        info(fileLabel,"Saved image: " + newImage.path);
        return {"success":true,"data":oldPath};
    }).catch((exception) => {
        client.release();
        error(fileLabel,"Error while saving image." + exception);
        return {"success":false, "data":exception}; 
    });
}


async function getProfilePicture(userId){
    const query = {
        text: `SELECT * from images.profile where userid='${userId}'`
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
        error(fileLabel,"Error while getting image. " + exception);
        return {"success":false, "data":exception}; 
    });
}

module.exports = {
    uploadProfilePicture:uploadProfilePicture,
    getProfilePicture: getProfilePicture
};