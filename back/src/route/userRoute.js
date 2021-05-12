const express = require('express');
const router = express.Router();
const UserController = require('./userController');
const userController = new UserController();

router.post("/register",userController.register);
router.get("/getUserByEmail/:email",userController.getUserByEmail);
router.put("/editUser",userController.editUser);
router.put("/deleteUser",userController.deleteUser);
router.get("/getUserById/:userId",userController.getUserById);
router.get("/getAllUniversities",userController.getAllUniversities);


module.exports = router;