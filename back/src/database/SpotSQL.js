'use strict';
const con = require('./DBHandler.js');
const {info, debug, warning, error}  = require('../winston');
const pool = con.pool;
const fileLabel = "SpotSQL"
const Spot = require('../objects/spot');
const util = require('util');
const makeSQL = require('./makeSQL');
const utility = require('../utility');

async function saveSpot(newSpot){
    const query1 = {
        text: `INSERT INTO spots.spots(spot_id, spot_name, x, y, geom, picture, spot_type, user_id, university) VALUES($1, $2, ${newSpot.x}, ${newSpot.y}, ST_GeomFromText('POINT(${newSpot.x} ${newSpot.y})', 4326), $3, $4, $5, $6);`,
        values: [newSpot.spotId, newSpot.spotName, newSpot.picture, newSpot.spotType, newSpot.userId, newSpot.university]
    };
    const query2 = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id, score1, score2, score3, score4, score5) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
        values: [newSpot.reviewId, newSpot.spotId, newSpot.comment, newSpot.score, newSpot.userId, newSpot.score1, newSpot.score2, newSpot.score3, newSpot.score4, newSpot.score5]
    };
    const deleteSpotQuery = {
        text: 'DELETE from spots.spots where spot_id = $1;',
        values: [newSpot.spotId]
    };

    if(utility.isEmpty(newSpot.spotName)){
        error(fileLabel,"ERROR OBJECT:" + util.inspect(newSpot.spotName,{showHidden: false, depth: null}));
        error(fileLabel,"Spot Name is invalid");
        return {"success":false,"data":"Spot Name is invalid"};
    } else if(utility.isEmpty(newSpot.spotType)){
        error(fileLabel,"ERROR OBJECT:" + util.inspect(newSpot.spotName,{showHidden: false, depth: null}));
        error(fileLabel,"Spot Type is invalid");
        return {"success":false,"data":"Spot Type is invalid"};
    }

    const client = await pool.connect();
    
    return client.query(query1).then(()=>{
        return client.query(query2).then(()=>{
            client.release();
            info(fileLabel,"saved spot: " + util.inspect(newSpot,{showHidden: false, depth: null}));
            return {"success":true,"data":newSpot};
        })
        .catch(err=>{
            error(fileLabel,"Error while saving review: " + util.inspect(err,{showHidden: false, depth: null}));
            return client.query(deleteSpotQuery).then(()=>{
                client.release();
                error(fileLabel,"deleted spot: " + util.inspect(err,{showHidden: false, depth: null}));
                return {"success":false,"data":err};
            })
            .catch(err=>{
                client.release();
                error(fileLabel,"ERROR OBJECT: " + util.inspect(err,{showHidden: false, depth: null}));
                error(fileLabel,"Error while deleting spot: " + err);
                return {"success":false,"data":err};
            })
        });
    })
    .catch(err=>{
        client.release();
        error(fileLabel,"ERROR OBJECT: " + util.inspect(err,{showHidden: false, depth: null}));
        error(fileLabel,"Error while saving spot: " + err);
        return {"success":false,"data":err};
    });
}

async function getSpotByKeywords(keywords){
    var spotIds = [];
    const query1 = makeSQL.getSpotQueryBuilder(keywords);
    const client = await pool.connect();
    return client.query(query1)
    .then((results1)=>{
        if (results1.rowCount == 0)
            return {"success":false, "data":"spot does not exist"};
        for(var i=0; i<results1.rows.length; i++){
            const spot = results1.rows[i];
            spotIds.push(spot.spot_id);
        }

        const query2 = makeSQL.getReviewsQueryBuilder(spotIds);
        return client.query(query2)
        .then( (results2) => {
            client.release();
            if (results2.rowCount == 0)
                return {"success":false, "data":"review does not exist"};
            info(fileLabel,"get review: " + util.inspect(spotIds,{showHidden: false, depth: null}));
            return {"success":true, "spots":results1.rows, "review":results2.rows};
        }).catch((exception)=>{
            client.release();
            error(fileLabel,"ERROR OBJECT: " + util.inspect(exception,{showHidden: false, depth: null}));
            error(fileLabel,"Error while getting review. " + exception);
            return {"success":false, "data":exception};      
        });
    }).catch((exception)=>{
        client.release();
        error(fileLabel,"ERROR OBJECT: " + util.inspect(exception,{showHidden: false, depth: null}));
        error(fileLabel,"Error while getting spot " + exception);
        return {"success":false, "data":exception};
    });
}

module.exports = {saveSpot:saveSpot, getSpotByKeywords:getSpotByKeywords}