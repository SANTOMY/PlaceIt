'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const pool = con.pool;
const fileLabel = "ImageSQL"


async function uploadProfilePicture(newImage){
    var query;
    const client = await pool.connect();
    var userExist = await getProfilePicture(newImage.userId);
    if (userExist.success){
        info(fileLabel,"User already exist. Updating picture");
        query = {
            text: 'Update images.profile set image=$1 where userid=$2',
            values: [newImage.image,newImage.userId]
        };
    } else{
        query = {
            text: 'INSERT INTO images.profile(userid, image) VALUES($1, $2)',
            values: [newImage.userId, newImage.image]
        };
    }
    return client.query(query).then((result)=>{
        client.release();
        info(fileLabel,"Saved profile image");
        return {"success":true};
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


async function uploadSpotPicture(newImage){
    var query;
    const client = await pool.connect();
    var spotExist = await getSpotPicture(newImage.spotId);
    if(spotExist.success) {
        info(fileLabel,"Spot already exist. Updating picture");
        query = {
            text: 'Update images.spot set image=$1 where spot_id=$2',
            values: [newImage.image,newImage.spotId]
        };
    }
    else {
        query = {
            text: 'INSERT INTO images.spot(spot_id, image) VALUES($1, $2)',
            values: [newImage.spotId, newImage.image]
        };
    }   

    return client.query(query).then((result)=>{
        info(fileLabel,"Inside query");
        client.release();
        info(fileLabel,"Saved spot image");
        return {"success":true};
    }).catch((exception) => {
        client.release();
        error(fileLabel,"Error while saving image." + exception);
        return {"success":false, "data":exception}; 
    });
}


async function getSpotPicture(spotId){
    const query = {
        text: `SELECT * from images.spot where spot_id='${spotId}'`
    };

    const client = await pool.connect();
    return client.query(query).then((result)=>{
        client.release();
        if (result.rowCount == 0){
            info(fileLabel,"There are no pictures for this spot");
            return {"success":false};
        }
        else{
            info(fileLabel,"Found image for spot: " + spotId);
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
    getProfilePicture: getProfilePicture,
    uploadSpotPicture:uploadSpotPicture,
    getSpotPicture:getSpotPicture
};