'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const { connect } = require('../route/reviewRoute.js');
const pool = con.pool;
const fileLabel = "ReviewSQL"
const Review = require('../objects/review');
const util = require('util');
const utility = require('../utility');
const { isEmpty } = require('../utility');

module.exports.saveReview = async function(newReview){
    const checkQuery = {
        text: 'SELECT spot_id from spots.spots Where spot_id = $1',
        values: [newReview.spotId]
    };
    const query = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
        values: [newReview.reviewId, newReview.spotId, newReview.comment, newReview.score, newReview.userId]
    };

    if(utility.isEmpty(newReview.spotId)){
        error(fileLabel,"ERROR OBJECT:" + util.inspect(newReview.spotId,{showHidden: false, depth: null}));
        error(fileLabel,"Spot name is empty or undefined" + newReview.spotName);
        return {"success":false,"data":"Spot Id is empty or undefined"};
    }
    const client = await pool.connect();
    return client.query(checkQuery)
    .then( nullchecker =>{
         if(nullchecker.rowCount == 0){
            client.release();
            return {"success":false,"data":"This spot does no exist: " + newSpot.spotName};
        }
        return client.query(query)
        .then(() =>{
            client.release();
            info(fileLabel,"saved review: " + util.inspect(newReview,{showHidden: false, depth: null}));
            return {"success":true,"data":newReview};
        })
        .catch((err)=>{
            client.release();
            error(fileLabel,"ERROR OBJECT:" + util.inspect(err,{showHidden: false, depth: null}));
            error(fileLabel,"Error while saving review: " + err);
            return {"success":false,"data":err};
        });
    })
    .catch()
}

module.exports.getReviewBySpotId = async function(spotId){
    const query = {
        text: `SELECT * FROM spots.review WHERE spot_id='${spotId}'`
    };
    const client = await pool.connect();
    return client.query(query).then( result => {
        client.release();
        if (result.rowCount == 0)
            return {"success":false, "data":"No reviews exist for this spot"};
        info(fileLabel,"get review by spot_id: " + util.inspect(spotId,{showHidden: false, depth: null}));
        return {"success":true, "data":result.rows};
    }).catch((err)=>{
        client.release();
        error(fileLabel,"ERROR OBJECT:" + util.inspect(err,{showHidden: false, depth: null}));
        error(fileLabel,"Error while getting review. " + err);
        return {"success":false, "data":err};      
    });
}