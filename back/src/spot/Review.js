'use strict';

class Review{
    constructor(id, spot_id, comment, score, user_id){
        this.id = id;
        this.spot_id = spot_id;
        this.comment = comment;
        this.score = score;
        this.user_id = user_id;
    }
// sayGoodBye = function () {
//     console.log("GoodBye!");
//   }
}

module.exports = Review;


