const Review = require('../objects/review');

module.exports = class Spot {
    constructor(spotId, spotName, x, y, picture, spotType, userId, reviewId, comment, score, university, score1, score2, score3, score4, score5){
        
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
        this.score1 = score1;
        this.score2 = score2;
        this.score3 = score3;
        this.score4 = score4;
        this.score5 = score5;
        this.review = new Review(reviewId, spotId, comment, score, userId, score1, score2, score3, score4, score5);
    }
}
