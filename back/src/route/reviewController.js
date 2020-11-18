const { v4: uuidv4 } = require('uuid');;
const {info, debug, warning, error} = require("../winston");
const Review = require("../objects/review");
const fileLabel = "reviewController"
const reviewSQL = require("../database/ReviewSQL");


module.exports = class ReviewController{
    constructor(){
        this.saveReview.bind(this);
    }
    
    async saveReview(req, res){
        const {spotId, comment, score, userId} = req.body;
        const review = new Review(uuidv4(), spotId, comment, score, userId);
        return reviewSQL.saveReview(review).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Registration of userId: " + userId);
                return res.status(200).json({"success": true, "userId": review.userId, "comment": review.comment, "score": review.score});
            }else{
                info(fileLabel, "Unsuccessful Registration" +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
    
        }).catch((exception)=>{
            error(fileLabel,"Error in attempt to register "+ ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }
}