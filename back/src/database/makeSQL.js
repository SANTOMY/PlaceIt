'use strict';
const utility = require('../utility');
const {info, debug, warning, error}  = require('../winston');
const fileLabel = "makeSQL";

module.exports.getSpotQueryBuilder = function(keywords){
    //input : keyword is Json
    //{"spotId" : "sample"} 
    var query = 'SELECT * FROM spots.spots';
    var where = [];
    if( !utility.isEmpty(keywords.spotId) )
        where.push(` spot_id='${keywords.spotId}'`);
    if( !utility.isEmpty(keywords.spotName) )
        where.push(` spot_name='${keywords.spotName}'`);
    if( !utility.isEmpty(keywords.geom) )
        where.push(` geom='${keywords.geom}'`);
    if( !utility.isEmpty(keywords.spotType) ) {
        where.push(` spot_type like '%${keywords.spotType.split(",")[0]}%'`);
        var tagList = [];
        var tagQuery = "( ";
        if (keywords.spotType.split(",").length > 1) {
            keywords.spotType.split(",").slice(1).forEach(function(key){
                tagList.push(` spot_type like '%${key}%'`);
            });
            if(tagList.length!=0){
                tagQuery += tagList.join(' or ');
                tagQuery += " )"
            }
            where.push(tagQuery);
        }
    }
    if( !utility.isEmpty(keywords.userId) )
        where.push(` user_id='${keywords.userId}'`);
    if( !utility.isEmpty(keywords.university) )
        where.push(` university='${keywords.university}'`);

    // confirm that -180 < xMax, xMin < 180 and that -90 < yMax, yMin < 90
    if( !utility.isEmpty(keywords.xMax) ){
        var xMax = Math.min( keywords.xMax, 180 );
        xMax = Math.max( xMax, -180 );
    }
    if( !utility.isEmpty(keywords.xMin) ){
        var xMin = Math.max( keywords.xMin, -180 );
        xMin = Math.min( xMin, 180 );
    }
    if( !utility.isEmpty(keywords.yMax) ){
        var yMax = Math.min( keywords.yMax, 90 );
        yMax = Math.max( yMax, -90 );
    }
    if( !utility.isEmpty(keywords.yMin) ){
        var yMin = Math.max( keywords.yMin, -90 );
        yMin = Math.min( yMin, 90 );
    }

    // confirm that xMax >= xMin and that yMax >= yMin
    if( !utility.isEmpty(keywords.xMax) && !utility.isEmpty(keywords.xMin) ){
        if( xMax < xMin ){
            xMax = 180;
            xMin = -180;
            error(fileLabel,"xMin is bigger than xMax");
        }
    }
    if( !utility.isEmpty(keywords.yMax) && !utility.isEmpty(keywords.yMin) ){
        if( yMax < yMin ){
            yMax = 90;
            yMin = -90;
            error(fileLabel,"yMin is bigger than yMax");
        }
    }

    if( !utility.isEmpty(keywords.xMax) ){
        where.push(` x<='${xMax}'`);
    }
    if( !utility.isEmpty(keywords.xMin) ){
        where.push(` x>='${xMin}'`);
    }
    if( !utility.isEmpty(keywords.yMax) ){
        where.push(` y<='${yMax}'`);
    }
    if( !utility.isEmpty(keywords.yMin) ){
        where.push(` y>='${yMin}'`);
    }

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