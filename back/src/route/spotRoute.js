const express = require('express');
const router = express.Router();
const SpotController = require('./spotController');
const spotController = new SpotController();

router.post("/addSpot",spotController.addSpot);

module.exports = router;