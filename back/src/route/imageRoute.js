const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {info, debug, warning, error}  = require('../winston');
const imageSQL = require("../database/ImageSQL");
const fileLabel = 'imageRoute'


const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

var store = multer.memoryStorage()
var upload = multer({imageFilter:imageFilter});


router.post("/spot-image/:spotId", upload.single('file'), async function(req, res) {
    var encoded_image = req.file.buffer.toString("base64");
    var newImage = {spotId:req.params.spotId,image:encoded_image};

    return imageSQL.uploadSpotPicture(newImage).then((result) => {
        if(result.success){            
            return res.status(201).json({"success": true});
        } else {
            return res.status(400).json({"success": false});
        }
    }).catch((exception) => {
        return res.status(400).json({"success": false, "error": exception});
    });
    
});

router.delete("/spot-image/:spotId", async function(req,res){
    const spotId = req.params.spotId;

    return imageSQL.deleteSpotPicture(spotId).then((result)=>{
        if(result.success){
            info(fileLabel, "Deleted spot images successfully");
            return res.status(200).json({"data":result.data}); //result.data is all the rows with corresponding spotId
        }else{
            info(fileLabel, "Could not delete profile image");
            return res.status(400).json({"success": false});
        }
    }).catch((exception)=>{
        error(fileLabel, "Error while deleting profile image: " + exception )
        return res.status(400).json({"success": false, "error": exception});
    });
});


router.get("/spot-image/:spotId", async function(req,res){
    const spotId = req.params.spotId;

    return imageSQL.getSpotPicture(spotId).then((result)=>{
        if(result.success){
            info(fileLabel, "Fetched spot images successfully");
            return res.status(200).json({"data":result.data}); //result.data is all the rows with corresponding spotId
        }else{
            info(fileLabel, "Could not fetch profile image");
            return res.status(400).json({"success": false});
        }
    }).catch((exception)=>{
        error(fileLabel, "Error while getting profile image: " + exception )
        return res.status(400).json({"success": false, "error": exception});
    });
});


router.post("/profile-image/:userId", upload.single('file'), (req, res, cb) => {
    var encoded_image = req.file.buffer.toString("base64");
    var newImage = {userId:req.params.userId,image:encoded_image};

    return imageSQL.uploadProfilePicture(newImage).then((result) => {
        if(result.success){            
            return res.status(201).json({"success": true});
        } else {
            return res.status(400).json({"success": false});
        }
    }).catch((exception) => {
        return res.status(400).json({"success": false, "error": exception});
    });

});

router.get("/profile-image/:userId", async function(req, res){
    const userId = req.params.userId;
    return imageSQL.getProfilePicture(userId).then((result)=>{
        if(result.success){
            info(fileLabel, "Fetched profile image successfully");
            //var buffer = Buffer.from(result.data.image)
            return res.status(200).json({image:result.data});
        }else{
            info(fileLabel, "Could not fetch profile image");
            return res.status(400).json({"success": false});
        }
    }).catch((exception)=>{
        error(fileLabel, "Error while getting profile image: " + exception )
        return res.status(400).json({"success": false, "error": exception});
    });
});

module.exports = router;
  