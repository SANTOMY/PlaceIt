'use strict';
const SearchWords = require("../objects/SearchWords");

module.exports.makeSQLforSpot = function(table, keywords){
    var query = `SELECT * FROM ${table}`;
    if(
        keywords.spotId != null 
        || keywords.spotName != null 
        || keywords.geom != null
        || keywords.spotType != null
        || keywords.userId != null
    ){
        query += ' WHERE';
    }
    var andFlag = false;
    if( keywords.spotId != null ){
        if( andFlag ){
            query += ' AND';
        }else{
            andFlag = true;
        }
        query += ` spot_id='${keywords.spotId}'`;
    }
    if( keywords.spotName != null ){
        if( andFlag ){
            query += ' AND';
        }else{
            andFlag = true;
        }
        query += ` spot_name='${keywords.spotName}'`;
    }
    if( keywords.geom != null ){
        if( andFlag ){
            query += ' AND';
        }else{
            andFlag = true;
        }
        query += ` geom='${keywords.geom}'`;
    }
    if( keywords.spotType != null ){
        if( andFlag ){
            query += ' AND';
        }else{
            andFlag = true;
        }
        query += ` spot_type='${keywords.spotType}'`;
    }
    if( keywords.userId != null ){
        if( andFlag ){
            query += ' AND';
        }else{
            andFlag = true;
        }
        query += ` user_id='${keywords.userId}'`;
    }
    query += ';';
    return query;
}

module.exports.makeSQLforReview = function(spotIds){
    var query = `SELECT * FROM spots.review where `;
    if(spotIds == null){
        return null;
    }
    else{
        for(var i=0; i<spotIds.length; i++){
            if(i==0){
                query += `spot_id='${spotIds[i]}'`
            }else{
                query += ` or spot_id='${spotIds[i]}'`
            }
        }
        return query
    }
}

// const makeSQL = require("./makeSQL"); // unsure to be needed but it does'nt work without this
// const words = new SearchWords( 123, "abc", "def", "ghi", 456 );
// makeSQL( "spots.spots", words );