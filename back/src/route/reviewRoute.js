const express = require('express');
const router = express.Router();
const ReviewController = require('./reviewController');
const reviewController = new ReviewController();

router.post("/saveReview",reviewController.saveReview);
router.get("/getReviewBySpotId/:spotId" ,reviewController.getReviewBySpotId)
router.get("/getReviewByUserId/:userId", reviewController.getReviewByUserId)
router.delete("/deleteReview", reviewController.deleteReview)

module.exports = router;