const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {info, debug, warning, error} = require("../winston");
const Spot = require("../objects/spot");
const fileLabel = "spotController";
const spotDatabase = require("../database/SpotSQL");


module.exports = class SpotController{
    constructor(){
        this.addSpot.bind(this);
    }
    
    async addSpot(req, res){
        const {spotName, geom, picture, spotType, userId} = req.body;
        debug(fileLabel,"Register spot information:" + spotName);
        //const spot = new Spot(uuidv4(), spotName, geom, picture, spotType, userId);
        const spot = {"spotName":spotName,"spotId":uuidv4()};
        //encrypt password
        // let salt = bcrypt.genSaltSync(10);
        // const encryptedPassword = bcrypt.hashSync(req.body.password ,salt);
        return res.status(200).json({"success": true, "spotId": spot['spotId'], "spotName": spot['spotName']});
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
