'use strict';
const searchWords = require("./searchWords");

module.exports = function makeSQL(table, keywords){
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
    console.log( query );
    return query;
}

// const makeSQL = require("./makeSQL"); // unsure to be needed but it does'nt work without this
// const words = new searchWords( 123, "abc", "def", "ghi", 456 );
// makeSQL( "spots.spots", words );