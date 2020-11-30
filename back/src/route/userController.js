const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');;
const {info, debug, warning, error} = require("../winston");
const User = require("../objects/user");
const fileLabel = "userController"
const userSQL = require("../database/UserSQL");


module.exports = class UserController{
    constructor(){
        this.register.bind(this);
        this.getUserByEmail.bind(this);
        this.editUser.bind(this)
    }
    
    async register(req, res){
        const {userName, email, password} = req.body;
        if (userName == undefined || email == undefined || password == undefined){
            return res.status(400).json({"success": false, "error": "Received undefined credentials"});
        }
        debug(fileLabel,"Username: " + userName + " Email: " + email + " Password: " + password);
        //encrypt password
        let salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password ,salt);
        const user = new User(uuidv4(),userName,email, encryptedPassword);
        return userSQL.saveUser(user).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Registration for " + email);
                return res.status(200).json({"success": true, "userId": user.userId, "userName": user.userName});
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
            error(fileLabel,"Error in attempt to register "+ email + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

    async editUser(req, res){
        const currentEmail = req.body.currentEmail;
        const newEmail = req.body.newEmail;
        const newPassword = req.body.newPassword;
        const newUserName = req.body.newUserName;
        let encryptedNewPassword;
        const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        if (typeof newEmail == 'undefined') {
            debug(fileLabel,"Email is not updated"); 
        } else if (reg.test(newEmail)) {
            debug(fileLabel,"New Email is valid: " + newEmail);
        } else {
            return res.status(400).json({"success": false, "error": "newEmail is not valid"});  
        }
        if (typeof newPassword == 'undefined') {
            debug(fileLabel,"Password is not updated"); 
        } else if (newPassword.trim()) {
            let salt = bcrypt.genSaltSync(10);
            encryptedNewPassword = bcrypt.hashSync(newPassword.trim() ,salt);
            debug(fileLabel,"New hashed password is valid: " + encryptedNewPassword);
        } else {
            return res.status(400).json({"success": false, "error": "newPassword is not valid"});
        }
        if (typeof newUserName == 'undefined') {
            debug(fileLabel,"User name is not updated"); 
        } else if (newUserName.trim()) {
            debug(fileLabel,"New user name is valid: " + newUserName);
        } else {
            return res.status(400).json({"success": false, "error": "newUsername is not valid"});
        }

        return userSQL.editUser(currentEmail.trim(), newEmail.trim(), encryptedNewPassword, newUserName.trim()).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Edit Information " + currentEmail);
                return res.status(200).json({"success": true,  "email":result.email, "password":result.password, "username":result.username});
            }else{
                info(fileLabel, "Unsuccessful Edit Information " + currentEmail + ": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": exception});
            }

        }).catch((exception)=>{
            error(fileLabel,"Error in attempt to edit "+ currentEmail + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

}
