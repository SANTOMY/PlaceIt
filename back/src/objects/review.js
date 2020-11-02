module.exports = class Review {
    constructor(review_id, spot_id, comment, score, user_id){
        this.review_id = review_id;
        this.spot_id = spot_id;
        this.comment = comment;
        this.score = score;
        this.user_id = user_id;
    }
}