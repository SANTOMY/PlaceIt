const Review = require('../objects/review');

module.exports = class Spot {
    constructor(spotId, spotName, x, y, picture, spotType, userId, reviewId, comment, score){
        
        this.spotId = spotId;
        this.spotName = spotName;
        this.x = x;
        this.y = y;
        this.picture = picture;
        this.spotType = spotType;
        this.userId = userId;
        this.reviewId = reviewId;
        this.comment = comment;
        this.score = score;
        this.review = new Review(reviewId, spotId, comment, score, userId);
    }
}
