'use strict';
const con = require('./DBHandler.js');
const connection = con.connection;
const {info, debug, warning, error}  = require('../winston');
// const { connect } = require('../route/userRoute.js');
const fileLabel = "SpotSQL"
const Spot = require('../objects/spot');

async function saveSpot(newSpot){
    const query1 = {
        text: 'INSERT INTO spots.spots(spot_id, spot_name, geom, picture, spot_type, user_id) VALUES($1, $2, $3, $4, $5, $6);',
        values: [newSpot.spot_id, newSpot.spot_name, newSpot.geom, newSpot.picture, newSpot.spot_type, newSpot.user_id]
    };
    const query2 = {
        text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
        values: [newSpot.review_id, newSpot.spot_id, newSpot.comment, newSpot.score, newSpot.user_id]
    };
    connection.connect().then(()=>{
        //TODO: NULL CHECK
        return connection.query(query1)
        .then((newSpot)=>{
            return connection.query(query2)
            .then((newSpot)=>{
                connection.end()
                .then(()=>{
                    debug(fileLabel,"saved spot: " + newSpot);
                    return {"sucess":true,"data":newSpot};
                })
            })
        })
        .catch((exception)=>{
            connection.end().then(()=>{
                error(fileLabel,"Error while saving spot: " + exception);
                return {"success":false,"data":exception};
            });
        });
    }).catch((exception)=>{
        error(fileLabel,"Error trying to connect to database: " + exception);
        return {"sucess":false,"data":exception};
    });
}

const testSpot = new Spot(4344400, 'spotname3', null, 'picture', 'spottype3', "user_id111", 6666, 'comment2', 90);
saveSpot(testSpot);
// new Spot(8, 'spotname3', null, 'picture', 'spottype3', 3, 6, 'comment2', 90).addToDatabase();