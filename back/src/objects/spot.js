const Review = require('../objects/review');

module.exports = class Spot {
    constructor(spotId, spotName, geom, picture, spotType, userId, reviewId, comment, score){
        
        this.spotId = spotId;
        this.spotName = spotName;
        this.geom = geom;
        this.picture = picture;
        this.spotType = spotType;
        this.userId = userId;
        this.reviewId = reviewId;
        this.comment = comment;
        this.score = score;
        this.review = new Review(reviewId, spotId, comment, score, userId);
    }
}
