const express = require('express');
const router = express.Router();
const SpotController = require('./spotController');
const spotController = new SpotController();

router.post("/register",spotController.register);
router.get("/fetch",spotController.fetch);

module.exports = router;