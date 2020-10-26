'use strict';

class Spot{
    constructor(spot_id, spot_name, geom, picture, spot_type, user_id, review_id, comment, score){
        
        this.spot_id = spot_id;
        this.spot_name = spot_name;
        this.geom = geom;
        this.picture = picture;
        this.spot_type = spot_type;
        this.user_id = user_id;
        this.review_id = review_id;
        this.comment = comment;
        this.score = score;
        this.review = new Review(review_id, spot_id, comment, score, user_id);
    }
    addToDatabase() {
        const conf = require('/Users/shimizu/pbl2_group2/back/src/config/config.js');
        const query1 = {
            text: 'INSERT INTO spots.spots(spot_id, spot_name, geom, picture, spot_type, user_id) VALUES($1, $2, $3, $4, $5, $6);',
            values: [this.spot_id, this.spot_name, this.geom, this.picture, this.spot_type, this.user_id]
        };
        const query2 = {
            text: 'INSERT INTO spots.review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5);',
            values: [ this.review_id, this.spot_id, this.comment, this.score, this.user_id]
        };
        const querys = [query1, query2];
        conf.connect(querys);
    }

}

class Review{
    constructor(review_id, spot_id, comment, score, user_id){
        this.review_id = review_id;
        this.spot_id = spot_id;
        this.comment = comment;
        this.score = score;
        this.user_id = user_id;
    }
}

new Spot(2, 'spotname', null, 'picture', 'spottype', 3, 4, 'comment', 'score').addToDatabase();