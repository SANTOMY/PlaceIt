const { v4: uuidv4 } = require('uuid');
const {info, debug, warning, error} = require("../winston");
const Spot = require("../objects/spot");
const fileLabel = "spotController";
const SpotSQL = require("../database/SpotSQL");

module.exports = class SpotController{
    constructor(){
        this.saveSpot.bind(this);
        this.getSpot.bind(this);
    }
    
    async saveSpot(req, res){
        const {spotName, x, y, picture, spotType, userId, comment, score} = req.body;
        debug(fileLabel,"Save spot information:" + spotName);
        const spot = new Spot(uuidv4(), spotName, x, y, picture, spotType, userId, uuidv4(), comment, score);
        return SpotSQL.saveSpot(spot).then((result)=>{
            if(result.success){
                debug(fileLabel, "Successful Registration for " + spotName);
                return res.status(200).json({"success": true, "spotId": spot.spotId, "spotName": spot.spotName});
            }else{
                info(fileLabel, "Unsuccessful Registration for " + spotName +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
        }).catch((exception)=>{
            error(fileLabel,"Error in attempt to saveSpot "+ spotName + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

    async getSpot(req, res){
        const keywords = req.body;
        return SpotSQL.getAllSpot(keywords).then((results)=>{
            if(results.success){
                debug(fileLabel, "Loaded Successfully");
                return res.status(200).json({"success": true, "data": results.data, "review": results.review});
            }else{
                info(fileLabel, "Loaded Unsuccessfully: " + JSON.stringify(results));
                return res.status(400).json({"success": false, "error": results.data});
            }
        }).catch((exception)=>{
            error(fileLabel, "Error in attempt to load: " + exception )
            return res.status(400).json({"success": false, "error": exception});
        })
    }
}