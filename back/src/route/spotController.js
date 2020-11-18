const { v4: uuidv4 } = require('uuid');
const {info, debug, warning, error} = require("../winston");
const Spot = require("../objects/spot");
const fileLabel = "spotController";
const SpotSQL = require("../database/SpotSQL");
const util = require('util');

module.exports = class SpotController{
    constructor(){
        this.saveSpot.bind(this);
        this.getSpot.bind(this);
    }
    
    async saveSpot(req, res){
        const {spotName, x, y, picture, spotType, userId, comment, score} = req.body;
        info(fileLabel,"Save spot information:" + util.inspect(spotName,{showHidden: false, depth: null}));
        const spot = new Spot(uuidv4(), spotName, x, y, picture, spotType, userId, uuidv4(), comment, score);
        return SpotSQL.saveSpot(spot).then((result)=>{
            if(result.success){
                info(fileLabel, "Successful Registration for " + util.inspect(spotName,{showHidden: false, depth: null}));
                return res.status(200).json({"success": true, "spotId": spot.spotId, "spotName": spot.spotName});
            }else{
                info(fileLabel, "Unsuccessful Registration for " + util.inspect(spotName,{showHidden: false, depth: null}) +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
        }).catch((exception)=>{
            info(fileLabel, "ERROR OBJECT: " + util.inspect(exception,{showHidden: false, depth: null}) +": " + JSON.stringify(exception));
            error(fileLabel,"Error in attempt to saveSpot "+ spotName + ": " + exception);
            return res.status(400).json({"success": false, "error": exception});
        });
    }

    async getSpot(req, res){
        const keywords = req.body;
        return SpotSQL.getSpot(keywords).then((results)=>{
            if(results.success){
                info(fileLabel, "Loaded Successfully");
                return res.status(200).json({"success": true, "data": results.data, "review": results.review});
            }else{
                info(fileLabel, "Loaded Unsuccessfully: " + JSON.stringify(results));
                return res.status(400).json({"success": false, "error": results.data});
            }
        }).catch((exception)=>{
            info(fileLabel, "ERROR OBJECT: " + util.inspect(exception,{showHidden: false, depth: null}) +": " + JSON.stringify(result));
            error(fileLabel, "Error in attempt to load: " + exception )
            return res.status(400).json({"success": false, "error": exception});
        })
    }
}