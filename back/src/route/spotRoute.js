const express = require('express');
const router = express.Router();
const SpotController = require('./spotController');
const spotController = new SpotController();

router.post("/saveSpot",spotController.saveSpot);
router.get("/getSpot",spotController.getSpot);

module.exports = router;