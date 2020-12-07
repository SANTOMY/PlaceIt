'use strict';
const utility = require('../utility');

module.exports.getSpotQueryBuilder = function(keywords){
    //input : keyword is Json
    //{"spotId" : "sample"} 
    var query = 'SELECT * FROM spots.spots';
    var where = []
    if( !utility.isEmpty(keywords.spotId) )
        where.push(` spot_id='${keywords.spotId}'`);
    if( !utility.isEmpty(keywords.spotName) )
        where.push(` spot_name='${keywords.spotName}'`);
    if( !utility.isEmpty(keywords.geom) )
        where.push(` geom='${keywords.geom}'`);
    if( !utility.isEmpty(keywords.spotType) )
        where.push(` spot_type='${keywords.spotType}'`);
    if( !utility.isEmpty(keywords.userId) )
        where.push(` user_id='${keywords.userId}'`);

    if(where.length!=0){
        query += ' where';
        query += where.join(' and ');
    }
    query += ';';
    return query;
}

module.exports.getReviewsQueryBuilder = function(spotIds){
    var query = `SELECT * FROM spots.review where `;
    if(spotIds == null || typeof spotIds == 'undefined' || spotIds.length == 0){
        return null;
    }
    else{
        for(var i=0; i<spotIds.length; i++){
            if(i==0)
                query += `spot_id='${spotIds[i]}'`
            else
                query += ` or spot_id='${spotIds[i]}'`
        }
        return query
    }
}