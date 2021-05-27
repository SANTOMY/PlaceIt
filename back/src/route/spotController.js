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
        this.deleteSpot.bind(this);
    }
    
    async saveSpot(req, res){
        const {spotName, x, y, picture, spotType, userId, comment, score, university, score1, score2, score3, score4, score5} = req.body;
        info(fileLabel,"Save spot information:" + util.inspect(spotName,{showHidden: false, depth: null}));
        const spot = new Spot(uuidv4(), spotName, x, y, picture, spotType, userId, uuidv4(), comment, score, university, score1, score2, score3, score4, score5);
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
        const keywords = req.query
        return SpotSQL.getSpotByKeywords(keywords).then((results)=>{
            if(results.success){
                info(fileLabel, "Loaded Successfully");
                return res.status(200).json({"success": true, "spots": results.spots});
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

    async deleteSpot(req,res){
        const spotId = req.body.spotId;
        return SpotSQL.deleteSpot(spotId).then((result)=>{
            if(result.success){
                info(fileLabel,"Successfully deleted spot, images and reviews");
                return res.status(200).json({"success": true})
            } else{
                info(fileLabel, "Unsuccessful deletion for spot " + util.inspect(spotId,{showHidden: false, depth: null}) +": " + JSON.stringify(result));
                return res.status(400).json({"success": false, "error": result.data});
            }
        }).catch((exception)=>{
            error(fileLabel, "ERROR OBJECT: " + util.inspect(exception,{showHidden: false, depth: null}) +": " + JSON.stringify(result));
            error(fileLabel, "Error while trying to delete spot: " + exception);
            return res.status(400).json({"success": false, "error": exception});
        })
    }
}