module.exports = class Review {
    constructor(reviewId, spotId, comment, score, userId){
        this.reviewId = reviewId;
        this.spotId = spotId;
        this.comment = comment;
        this.score = score;
        this.userId = userId;
    }
}