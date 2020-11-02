'use strict';
const con = require('./DBHandler.js');
const connection = con.connection;
const {info, debug, warning, error}  = require('../winston');
// const { connect } = require('../route/userRoute.js');
const fileLabel = "SpotSQL"
const Spot = require('../objects/spot');

module.exports.saveSpot = function(newSpot){
    const query1 = {
        text: 'INSERT INTO spots.spots(spot_id, spot_name, geom, picture, spot_type, user_id) VALUES($1, $2, $3, $4, $5, $6);',
        values: [newSpot.spotId, newSpot.spotName, newSpot.geom, newSpot.picture, newSpot.spotType, newSpot.userId]
    };
    const query2 = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
        values: [newSpot.reviewId, newSpot.spotId, newSpot.comment, newSpot.score, newSpot.userId]
    };
    const deleteSpotQuery = {
        text: 'DELETE from spots.spots where spot_id = $1;',
        values: [newSpot.spotId]
    };
    return connection.connect().then(()=>{
        //TODO: NULL CHECK
        return connection.query(query1)
        .then(()=>{
            return connection.query(query2)
            .then(()=>{
                connection.end()
                debug(fileLabel,"saved spot: " + newSpot);
                return {"success":true,"data":newSpot};
            })
            .catch((exception)=>{
                error(fileLabel,"Error while saving review: " + exception);
                return connection.query(deleteSpotQuery)
                .then(()=>{
                    connection.end()
                    debug(fileLabel,"deleted spot: " + newSpot);
                    return {"success":false,"data":exception};
                })
                .catch(()=>{
                    error(fileLabel,"Error while deleting spot: " + exception);
                    return {"success":false,"data":exception};
                })
            });
        })
        .catch((exception)=>{
            connection.end()
            error(fileLabel,"Error while saving spot: " + exception);
            return {"success":false,"data":exception};
        });
    }).catch((exception)=>{
        error(fileLabel,"Error trying to connect to database: " + exception);
        return {"success":false,"data":exception};
    });
}

// const testSpot = new Spot(4311, 'spotname3', null, 'picture', 'spottype3', "user_id111", 67, 'comment2', 90);
// saveSpot(testSpot);