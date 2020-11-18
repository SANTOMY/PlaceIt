'use strict';
const con = require('./DBHandler.js');
const connection = con.connection;
const {info, debug, warning, error}  = require('../winston');
const pool = con.pool;
const fileLabel = "SpotSQL"
const Spot = require('../objects/spot');
const util = require('util');
const makeSQL = require('./makeSQL');

async function saveSpot(newSpot){
    const query1 = {
        text: `INSERT INTO spots.spots(spot_id, spot_name, geom, picture, spot_type, user_id) VALUES($1, $2, ST_GeomFromText('POINT(${newSpot.x} ${newSpot.y})', 4326), $3, $4, $5);`,
        values: [newSpot.spotId, newSpot.spotName, newSpot.picture, newSpot.spotType, newSpot.userId]
    };
    const query2 = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
        values: [newSpot.reviewId, newSpot.spotId, newSpot.comment, newSpot.score, newSpot.userId]
    };
    const deleteSpotQuery = {
        text: 'DELETE from spots.spots where spot_id = $1;',
        values: [newSpot.spotId]
    };
    const client = await pool.connect();
    //TODO: NULL CHECK
    if((isEmpty(newSpot.spotName))){
        error(fileLabel,"Spot Name is Empty!!!!")
        return {"success":false,"data":"Spot Name is Empty!!!!"};
    }
    return client.query(query1).then(()=>{
        return client.query(query2).then(()=>{
            client.release();
            info(fileLabel,"saved spot: " + newSpot);
            return {"success":true,"data":newSpot};
        })
        .catch(err=>{
            client.release();
            info(fileLabel,"Error while saving review: " + err);
            return client.query(deleteSpotQuery).then(()=>{
                client.release();
                debug(fileLabel,"deleted spot: " + newSpot);
                return {"success":false,"data":err};
            })
            .catch(err=>{
                error(fileLabel,"Error while deleting spot: " + err);
                return {"success":false,"data":err};
            })
        });
    })
    .catch(err=>{
        client.release();
        error(fileLabel,"Error while saving spot: " + err);
        return {"success":false,"data":err};
    });
}

async function getSpot(keywords){
    //init Query
    const query1 = {
        text: 'SELECT * FROM spots.spots',
        values: []
    }
    var spotIds = [];
    if( keywords != null ){
        query1.text = makeSQL.makeSQLforSpot(keywords);
    }
    const client = await pool.connect();
    return client.query(query1)
    .then((results1)=>{
        info(fileLabel, "Load spots")
        if (results1.rowCount == 0)
            return {"success":false, "data":"spot does not exist"};
        for(var i=0; i<results1.rows.length; i++){
            const spot = results1.rows[i];
            spotIds.push(spot.spot_id);
        }

        const query2 = makeSQL.makeSQLforReview(spotIds);
        return client.query(query2)
        .then( (results2) => {
            client.release();
            if (results2.rowCount == 0)
                return {"success":false, "data":"review does not exist"};
            info(fileLabel,"get review: " + util.inspect(spotIds,{showHidden: false, depth: null}));
            return {"success":true, "data":results1.rows, "review":results2.rows};
        }).catch((exception)=>{
            client.release();
            error(fileLabel,"Error while getting review. " + exception);
            return {"success":false, "data":exception};      
        });
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"Error while getting spot " + exception);
        return {"success":false, "data":exception};
    });
}
    function isEmpty(object){
    const tmp = object.replace(/ /g, "");
    if(tmp.length==0){
        return true;
    }
    return false
}

module.exports = {saveSpot:saveSpot, getSpot:getSpot, isEmpty:isEmpty}