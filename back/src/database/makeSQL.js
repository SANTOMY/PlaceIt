'use strict';

module.exports.getSpotQueryBuilder = function(keywords){
    //input : keyword is Json
    //{"spotId" : "sample"} 
    var query = 'SELECT * FROM spots.spots';
    var where = [];
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

    // confirm that -180 < xMax, xMin < 180 and that -90 < yMax, yMin < 90
    if( keywords.xMax != null ){
        var xMax = Math.min( keywords.xMax, 180 );
        xMax = Math.max( xMax, -180 );
    }
    if( keywords.xMin != null ){
        var xMin = Math.max( keywords.xMin, -180 );
        xMin = Math.min( xMin, 180 );
    }
    if( keywords.yMax != null ){
        var yMax = Math.min( keywords.yMax, 90 );
        yMax = Math.max( yMax, -90 );
    }
    if( keywords.yMin != null ){
        var yMin = Math.max( keywords.yMin, -90 );
        yMin = Math.min( yMin, 90 );
    }

    // confirm that xMax >= xMin and that yMax >= yMin
    if( keywords.xMax != null && keywords.xMin != null ){
        if( xMax < xMin ){
            console.log("xMin is bigger than xMax.");
            xMax = 180;
            xMin = -180;
        }
    }
    if( keywords.yMax != null && keywords.yMin != null ){
        if( yMax < yMin ){
            console.log("yMin is bigger than yMax.");
            yMax = 90;
            yMin = -90;
        }
    }

    if( keywords.xMax != null ){
        where.push(` x<='${xMax}'`);
    }
    if( keywords.xMin != null ){
        where.push(` x>='${xMin}'`);
    }
    if( keywords.yMax != null ){
        where.push(` y<='${yMax}'`);
    }
    if( keywords.yMin != null ){
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