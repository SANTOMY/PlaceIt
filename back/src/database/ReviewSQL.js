'use strict';
const con = require('./DBHandler.js');
const connection = con.connection;
const {info, debug, warning, error}  = require('../winston');
const { connect } = require('../route/reviewRoute.js');
const pool = con.pool;
const fileLabel = "ReviewSQL"
const Review = require('../objects/review');
const util = require('util');

module.exports.saveReview = async function(newReview){
    const query = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
        values: [newReview.reviewId, newReview.spotId, newReview.comment, newReview.score, newReview.userId]
    };
    const client = await pool.connect();
    return client.query(query)
    .then(() =>{
        client.release();
        debug(fileLabel,"saved review: " + newReview);
        return {"success":true,"data":newReview};
    })
    .catch((err)=>{
        client.release();
        info(fileLabel,"ERROR OBJECT:" + util.inspect(err,{showHidden: false, depth: null}));
        error(fileLabel,"Error while saving review: " + err);
        return {"success":false,"data":err};
    });
}

module.exports.getReviewBySpotId = async function(spotId){
    const query = {
        text: `SELECT * FROM spots.review WHERE spot_id='${spotId}'`
    };
    const client = await pool.connect();
    return client.query(query).then( result => {
        client.release();
        if (result.rowCount == 0)
            return {"success":false, "data":"Review does not exist"};
        info(fileLabel,"get review by spot_id: " + util.inspect(spotId,{showHidden: false, depth: null}));
        return {"success":true, "data":result.rows};
    }).catch((err)=>{
        client.release();
        info(fileLabel,"ERROR OBJECT:" + util.inspect(err,{showHidden: false, depth: null}));
        error(fileLabel,"Error while getting review. " + err);
        return {"success":false, "data":err};      
    });
}


// const testReview = new Review("review_id114", "spot_id1111", 'comment2', 90, "user_id111");
// const ReviewSQL = require('./ReviewSQL');
// ReviewSQL.saveReview(testReview);