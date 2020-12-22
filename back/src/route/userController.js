const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');;
const {info, debug, warning, error} = require("../winston");
const User = require("../objects/user");
const fileLabel = "userController"
const userSQL = require("../database/UserSQL");
const utility = require("../utility");

module.exports = class UserController{
    constructor(){
        this.register.bind(this);
        this.getUserByEmail.bind(this);
        this.editUser.bind(this);
        this.getUserById.bind(this);
    }
    
    async register(req, res){
        const {userName, email, password} = req.body;
        if (utility.isEmpty(userName) || utility.isEmpty(email) || utility.isEmpty(password)){
            return res.status(400).json({"success": false, "error": "Received undefined credentials"});
        }
        //encrypt password
        let salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password ,salt);
        const user = new User(uuidv4(),userName,email, encryptedPassword);
        return userSQL.saveUser(user).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Registration for " + email);
                return res.status(200).json({"success": true, "userId": user.userId, "userName": user.userName, "email": user.email});
            }else{
                info(fileLabel, "Unsuccessful Registration for " + email +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
    
        }).catch((exception)=>{
            error(fileLabel,"Error in attempt to register "+ email + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

    async getUserByEmail(req, res){
        const email = req.params.email;
        return userSQL.getUserByEmail(email).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Get Information by email " + email);
                return res.status(200).json({"success": true, "data": result.data});
            }else{
                info(fileLabel, "Unsuccessful Get Information by email " + email +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
        }).catch((exception)=>{
            error(fileLabel,"Error in attempt to get user "+ email + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

    async editUser(req, res){
        const currentEmail = req.body.currentEmail;
        const newEmail = utility.isEmpty(req.body.newEmail) ? '' : req.body.newEmail;
        const newPassword = req.body.newPassword;
        const newUserName = utility.isEmpty(req.body.newUserName) ? '' : req.body.newUserName;
        let encryptedNewPassword;
        const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        if (utility.isEmpty(newEmail)) {
            debug(fileLabel,"Email is not updated"); 
        } else if (reg.test(newEmail)) {
            debug(fileLabel,"New Email is valid: " + newEmail);
        } else {
            return res.status(400).json({"success": false, "error": "newEmail is not valid"});  
        }
        if (utility.isEmpty(newPassword)) {
            debug(fileLabel,"Password is not updated"); 
        } else {
            let salt = bcrypt.genSaltSync(10);
            encryptedNewPassword = bcrypt.hashSync(newPassword.trim() ,salt);
            debug(fileLabel,"New hashed password is valid: " + encryptedNewPassword);
        }
        if (utility.isEmpty(newUserName)) {
            debug(fileLabel,"User name is not updated"); 
        } else {
            debug(fileLabel,"New user name is valid: " + newUserName);
        }

        return userSQL.editUser(currentEmail.trim(), newEmail.trim(), encryptedNewPassword, newUserName.trim()).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Edit Information " + currentEmail);
                return res.status(200).json({"success": true, "email":result.email, "password":result.password, "username":result.username});
            }else{
                info(fileLabel, "Unsuccessful Edit Information " + currentEmail + ": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": exception});
            }

        }).catch((exception)=>{
            error(fileLabel,"Error in attempt to edit "+ currentEmail + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

    async getUserById(req,res){
        const userId = req.params.userId;
        return userSQL.getUserById(userId).then((result) =>{
            if(result.success){
                debug(fileLabel,"Successfully fetched user: " + userId);
                return res.status(200).json({"success": true, "data": result.data});
            } else{
                info(fileLabel, "Could not fetched user with id " + userId +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
        }).catch((exception)=>{
            error(fileLabel,"Error while getting user "+ userId + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

}
