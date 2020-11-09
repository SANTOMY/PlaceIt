const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');;
const {info, debug, warning, error} = require("../winston");
const User = require("../objects/user");
const fileLabel = "userController"
const userSQL = require("../database/UserSQL");


module.exports = class UserController{
    constructor(){
        this.register.bind(this);
    }
    
    async register(req, res){
        const {userName, email, password} = req.body;
        //encrypt password
        let salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(req.body.password ,salt);
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
        const email = req.body.email;
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

    async edit(req, res){
        const {currentEmail, newEmail, newPassword, newUserName} = req.body;
        let encryptedNewPassword;
        if (newPassword != "") {
            let salt = bcrypt.genSaltSync(10);
            encryptedNewPassword = bcrypt.hashSync(newPassword ,salt);
        } else {
            encryptedNewPassword = "";
        }
        return userSQL.edit(currentEmail, newEmail, encryptedNewPassword, newUserName).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Edit Information " + currentEmail);
                return res.status(200).json({"success": true,  "newEmail":newEmail, "newUserName":newUserName});
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
