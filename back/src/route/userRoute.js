const express = require('express');
const router = express.Router();
const UserController = require('./userController');
const userController = new UserController();

router.post("/register",userController.register);
router.get("/getUserByEmail",userController.getUserByEmail);
router.put("/edit",userController.edit);

module.exports = router;