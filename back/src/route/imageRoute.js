const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {info, debug, warning, error}  = require('../winston');
const imageSQL = require("../database/ImageSQL");
const fileLabel = 'imageRoute'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `${process.cwd()}/src/uploads/`
      fs.mkdirSync(path, { recursive: true })
      return cb(null, path)
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({storage:storage, imageFilter:imageFilter});


router.post("/spot-image", upload.single('file'), async function(req, res) {
    console.log(req.file);
    console.log(req.files);
    //TODO
    //add database call to store path

    return res.status(201).json({"success": true}); // success
});


router.get("/spot-image/:spotId", async function(req,res){
    const spotId = req.params.spotId;
    //if spot has many images, need to make a list and send all files
    res.sendFile();
});


router.post("/profile-image/:userId", upload.single('file'), (req, res, cb) => {
    console.log(req.file);
    //console.log(req.files);
    var newImage = {userId:req.params.userId,path:req.file.path};
    console.log(newImage);
    return imageSQL.uploadProfilePicture(newImage).then((result) => {
        if(result.success){            
            if (result.data){
                console.log("Previous path: " + result.data);
                console.log("New path: " + newImage.path);
                fs.unlinkSync(result.data);
            }
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
            console.log(result);
            info(fileLabel, "Fetched profile image successfully");
            return res.status(200).sendFile(result.data[result.data.length - 1].path); //path to picture on filesystem
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



    //For variable destination
    //     var dir = JSON.parse(req.body.data).directory;
    // var filename = req.file.filename;

    // fs.move('../tempDir/' + fileName, '../tempDir/' + dir + '/' + fileName, function (err) {
    //     if (err) {
    //         return console.error(err);
    //     }