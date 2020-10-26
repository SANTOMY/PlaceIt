const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');;
const {info, debug, warning, error} = require("../winston");
//const User = require("") //Add later when yamate creates user object
const fileLabel = "userController"
//const userDatabase = require(""); //Add later when yamate creates user database file


module.exports = class UserController{
    constructor(){
        this.register.bind(this);
    }
    
    async register(req, res){
        const {userName, email, password} = req.body;
        debug(fileLabel,"Register user with email:" + email);
        //const user = new User(uuidv4(),userName,email, password);
        const user = {"userName":userName,"userId":uuidv4()};
        //encrypt password
        let salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(req.body.password ,salt);
        return res.status(200).json({"success": true, "userId": user['userId'], "userName": user['userName']});
    }
//     return userDatabase.saveUser(user, password).then((result)=>{

//         if(result.success){
//             debug(fileLabel, "Successful Registration for " + email);
//             return res.status(200).json({"success": true, "userId": user.userId, "userName": user.userName});
//         }else{
//             info(fileLabel, "Unsuccessful Registration for " + email +": " + JSON.stringify(result));
//             return res.status(400).json({"success": false, "msg": result.data});
//         }

//     }).catch((error)=>{
//         error(fileLabel,"Error in attempt to register by "+ email + ": " + JSON.stringify(error));
//         return res.status(400).json({"success": false, "msg": error});
//         });
//     }

}
