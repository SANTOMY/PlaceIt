'use strict';
const con = require('./DBHandler.js');
const connection = con.connection;
const {info, debug, warning, error}  = require('../winston');
// const { connect } = require('../route/userRoute.js');
const fileLabel = "SpotSQL"
const Spot = require('../objects/spot');
const util = require('util');
const makeSQL = require('./makeSQL');

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

module.exports.getSpot = function(keywords){
    const query = {
        text: 'SELECT * FROM spots.spots',
        values: []
    }
    if( keywords != null ){
        query.text = makeSQL("spots.spots", keywords);
    }
    return connection.connect().then(()=>{
        return connection.query(query).then((results)=>{
            connection.end();
            info(fileLabel, "Load spots")
            return {"success":true, "data":results.rows};
        }).catch((exception)=>{
            connection.end();
            info(fileLabel, "Error while loading:" + exception)
            return {"success":false, "data":exception};
        })
    }).catch((exception)=>{
        connection.end();
        info(fileLabel, "Error while connecting" + exception)
        return {"success":false, "data":exception};
    })
}

module.exports.getReview = function(spot_id){
    const query = {
        text: `SELECT * FROM spots.review WHERE spot_id='${spot_id}'`
    };
    return connection.connect().then(()=>{
        return connection.query(query).then( result => {
            connection.end();
            if (result.rowCount == 0)
                return {"success":false, "data":"review does not exist"};
            info(fileLabel,"get review: " + util.inspect(spot_id,{showHidden: false, depth: null}));
            // for(var i=0; i<result.rows.length; i++){
            //     const row = result.rows[i]
            //     console.log(row.review_id)
            // }
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

const SpotSQL = require('./SpotSQL');
SpotSQL.getReview("spot_id1111");

