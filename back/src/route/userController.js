const bcrypt = require('bcryptjs');
const UUID = require('uuid/v4');
const {info, debug, warning, error} = require("../winston");
const User = require("") //Add later when yamate creates user object
const fileLabel = "userController"
const userDatabase = require(""); //Add later when yamate creates user database file


module.exports = class UserController{
    constructor(){

    }
    
    async register(req, res){
    const {userName, userId, email, password} = req.body;
    const user = new User(UUID(),userName,email, password);

    //encrypt password
    let salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password ,salt);

    return userDatabase.saveUser(user, password).then((result)=>{

        if(result.success){
            debug(fileLabel, "Successful Registration for " + email);
            return res.status(200).json({"success": true, "userId": user.userId, "userName": user.userName});
        }else{
            info(fileLabel, "Unsuccessful Registration for " + email +": " + JSON.stringify(result));
            return res.status(400).json({"success": false, "msg": result.data});
        }

    }).catch((error)=>{
        error(fileLabel,"Error in attempt to register by "+ email + ": " + JSON.stringify(error));
        return res.status(400).json({"success": false, "msg": error});
        });
    }

}
