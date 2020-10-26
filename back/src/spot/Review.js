'use strict';


class Review{
    constructor(review_id, spot_id, comment, score, user_id){
        this.review_id = review_id;
        this.spot_id = spot_id;
        this.comment = comment;
        this.score = score;
        this.user_id = user_id;
    }
    addToDatabase() {
        const conf = require('../config/config.js')
        const query = {
            text: 'INSERT INTO Review(review_id, spot_id, comment, score, user_id) VALUES($1, $2, $3, $4, $5)',
            values: [this.review_id, this.spot_id, this.comment, this.score, this.user_id]
        }
        conf.connect(query)
    }
}

module.exports = Review;


