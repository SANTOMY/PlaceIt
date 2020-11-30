'use strict';

module.exports.getSpotQueryBuilder = function(keywords){
    //input : keyword is Json
    //{"spotId" : "sample"} 
    var query = 'SELECT * FROM spots.spots';
    var where = []
    if( keywords.spotId != null )
        where.push(` spot_id='${keywords.spotId}'`);
    if( keywords.spotName != null )
        where.push(` spot_name='${keywords.spotName}'`);
    if( keywords.geom != null )
        where.push(` geom='${keywords.geom}'`);
    if( keywords.spotType != null )
        where.push(` spot_type='${keywords.spotType}'`);
    if( keywords.userId != null )
        where.push(` user_id='${keywords.userId}'`);

    if( keywords.xMax != null )
        where.push(` x<='${keywords.xMax}'`);
    if( keywords.xMin != null )
        where.push(` x>='${keywords.xMin}'`);
    if( keywords.yMax != null )
        where.push(` y<='${keywords.yMax}'`);
    if( keywords.yMin != null )
        where.push(` y>='${keywords.xMin}'`);

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