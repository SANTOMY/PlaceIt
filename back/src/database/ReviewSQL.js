'use strict';
const con = require('./DBHandler.js');
const connection = con.connection;
const {info, debug, warning, error}  = require('../winston');
const fileLabel = "ReviewSQL"
const Review = require('../objects/review');
const util = require('util');

module.exports.saveReview = async function(newReview){
    const query = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
        values: [newReview.reviewId, newReview.spotId, newReview.comment, newReview.score, newReview.userId]
    };
    return connection.connect().then(()=>{
        //TODO: NULL CHECK
        return connection.query(query)
        .then(()=>{
                connection.end()
                debug(fileLabel,"saved review: " + newReview);
                return {"success":true,"data":newReview};
        })
        .catch((exception)=>{
            connection.end()
            error(fileLabel,"Error while saving review: " + exception);
            return {"success":false,"data":exception};
        });
    }).catch((exception)=>{
        error(fileLabel,"Error trying to connect to database: " + exception);
        return {"success":false,"data":exception};
    });
}

module.exports.getReviewBySpotId = async function(spotId){
    const query = {
        text: `SELECT * FROM spots.review WHERE spot_id='${spotId}'`
    };
    return connection.connect().then(()=>{
        return connection.query(query).then( result => {
            connection.end();
            if (result.rowCount == 0)
                return {"success":false, "data":"Review does not exist"};
            info(fileLabel,"get review by spot_id: " + util.inspect(spotId,{showHidden: false, depth: null}));
            return {"success":true, "data":result.rows};
        }).catch((exception)=>{
            connection.end();
            error(fileLabel,"Error while getting review. " + exception);
            return {"success":false, "data":exception};      
        });
    }).catch((exception)=>{
        connection.end();
        error(fileLabel,"Error trying to connect to database: " + exception);
        return {"success":false, "data":exception};
    });
}


// const testReview = new Review("review_id114", "spot_id1111", 'comment2', 90, "user_id111");
// const ReviewSQL = require('./ReviewSQL');
// ReviewSQL.saveReview(testReview);