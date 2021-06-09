'use strict';
const con = require('./DBHandler.js');
const { info, debug, warning, error } = require('../winston');
const { connect } = require('../route/reviewRoute.js');
const pool = con.pool;
const fileLabel = "ReviewSQL"
const Review = require('../objects/review');
const util = require('util');
const utility = require('../utility');

module.exports.saveReview = async function (newReview) {
    const checkQuery = {
        text: 'SELECT spot_id from spots.spots Where spot_id = $1',
        values: [newReview.spotId]
    };
    const query = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id, score1, score2, score3, score4, score5) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
        values: [newReview.reviewId, newReview.spotId, newReview.comment, newReview.score, newReview.userId, newReview.score1, newReview.score2, newReview.score3, newReview.score4, newReview.score5]
    };

    if (utility.isEmpty(newReview.spotId)) {
        error(fileLabel, "ERROR OBJECT:" + util.inspect(newReview.spotId, { showHidden: false, depth: null }));
        error(fileLabel, "Spot name is empty or undefined" + newReview.spotName);
        return { "success": false, "data": "Spot Name is empty or undefined" };
    }
    const client = await pool.connect();
    return client.query(checkQuery)
        .then(nullchecker => {
            if (nullchecker.rowCount == 0) {
                client.release();
                return { "success": false, "data": "This spot does not exist: " + newSpot.spotName };
            }
            return client.query(query)
                .then(() => {
                    client.release();
                    info(fileLabel, "saved review: " + util.inspect(newReview, { showHidden: false, depth: null }));
                    return { "success": true, "data": newReview };
                })
                .catch((err) => {
                    client.release();
                    error(fileLabel, "ERROR OBJECT:" + util.inspect(err, { showHidden: false, depth: null }));
                    error(fileLabel, "Error while saving review: " + err);
                    return { "success": false, "data": err };
                });
        })
        .catch()
}

module.exports.getReviewBySpotId = async function (spotId) {
    const query = {
        text: `select r.*, u.username from spots.review as r, users.users as u where u.id = r.user_id and r.spot_id='${spotId}'`
    };
    const client = await pool.connect();
    return client.query(query).then(result => {
        client.release();
        if (result.rowCount == 0)
            return { "success": false, "review": "No reviews exist for this spot" };
        info(fileLabel, "get review by spot_id: " + util.inspect(spotId, { showHidden: false, depth: null }));
        return { "success": true, "review": result.rows };
    }).catch((err) => {
        client.release();
        error(fileLabel, "ERROR OBJECT:" + util.inspect(err, { showHidden: false, depth: null }));
        error(fileLabel, "Error while getting review. " + err);
        return { "success": false, "error": err };
    });
}

module.exports.getReviewByUserId = async function (userId) {
    // get reviews posted by the user
    // userId -> {"success":true, "review":[{"review_id":XX, "comment":YY, ...}]}
    const query = {
        text: `SELECT * FROM spots.review WHERE user_id='${userId}'`
    };
    const client = await pool.connect();
    return client.query(query).then(result => {
        client.release();
        if (result.rowCount == 0)
            return { "success": false, "review": "No reviews exist by this user" };
        info(fileLabel, "get review by user_id: " + util.inspect(userId, { showHidden: false, depth: null }));
        return { "success": true, "review": result.rows };
    }).catch((err) => {
        client.release();
        error(fileLabel, "ERROR OBJECT:" + util.inspect(err, { showHidden: false, depth: null }));
        error(fileLabel, "Error while getting review. " + err);
        return { "success": false, "error": err };
    });
}

module.exports.deleteReview = async function (reviewId) {

    if (utility.isEmpty(reviewId)) {
        error(fileLabel, "Empty reviewId provided");
        return { "success": false, "data": "reviewId id is empty" };
    }

    const deleteReviewQuery = {
        text: `DELETE FROM spots.review where review_id = $1`,
        values: [reviewId]
    };
    const client = await pool.connect();

    return client.query(deleteReviewQuery).then(() => {
        client.release();
        info(fileLabel, "removed review with id: " + reviewId);
        return { "success": true };
    })
        .catch(err => {
            client.release();
            error(fileLabel, "Error while deleting review with id: " + reviewId);
            error(fileLabel, "ERROR OBJECT: " + util.inspect(err, { showHidden: false, depth: null }));
            return { "success": false, "data": err };
        });

}