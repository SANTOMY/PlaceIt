const express = require('express');
const router = express.Router();
const ReviewController = require('./reviewController');
const reviewController = new ReviewController();

router.post("/register",reviewController.register);

module.exports = router;