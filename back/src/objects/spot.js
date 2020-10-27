const Review = require('../objects/review');

module.exports = class Spot {
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
}
