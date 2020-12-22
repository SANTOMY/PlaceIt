const express = require('express');
const router = express.Router();
const UserController = require('./userController');
const userController = new UserController();

router.post("/register",userController.register);
router.get("/getUserByEmail/:email",userController.getUserByEmail);
router.put("/editUser",userController.editUser);
router.get("/getUserById/:userId",userController.getUserById);


module.exports = router;