module.exports = class Review {
    constructor(reviewId, spotId, comment, score, userId, score1, score2, score3, score4, score5){
        this.reviewId = reviewId;
        this.spotId = spotId;
        this.comment = comment;
        this.score = score;
        this.userId = userId;
        this.score1 = score1;
        this.score2 = score2;
        this.score3 = score3;
        this.score4 = score4;
        this.score5 = score5;
    }
}