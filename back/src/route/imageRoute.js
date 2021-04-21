const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {info, debug, warning, error}  = require('../winston');
const imageSQL = require("../database/ImageSQL");
const fileLabel = 'imageRoute'

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const tempDir = `${process.cwd()}/src/uploads/`
//       fs.mkdirSync(tempDir, { recursive: true })
//       return cb(null, tempDir)
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + tempDir.extname(file.originalname));
//     }
// });

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};

var store = multer.memoryStorage()
var upload = multer({imageFilter:imageFilter});


// function moveUploadedImage(uploadedImage,type){
//     if (!type == "spots" && !type == "profile"){
//         return console.error("Invalid image type");
//     }

//     const tempDir = `${process.cwd()}/src/uploads/`;
//     const imgPath = path.join(tempDir,uploadedImage);

//     const imgDir = path.join(tempDir,type+"/"); // $cwd/src/uploads/spots/ || $cwd/src/uploads/profile/
//     fs.mkdirSync(imgDir, { recursive: true });
//     const newImgPath = path.join(imgDir,uploadedImage);

//     fs.move(imgPath, newImgPath, function (err) {
//         if (err) {
//             return console.error(err);
//         }
//     }  
// }


router.post("/spot-image/:spotId", upload.single('file'), async function(req, res) {
    console.log(req.file);
    console.log(req.params);
    var encoded_image = req.file.buffer.toString("base64");
    var newImage = {spotId:req.params.spotId,image:encoded_image};
    console.log(newImage.spotId);

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

//Find out how to send back multiple files for one spot
router.get("/spot-image/:spotId", async function(req,res){
    const spotId = req.params.spotId;

    return imageSQL.getSpotPicture(spotId).then((result)=>{
        if(result.success){
            console.log(result);
            info(fileLabel, "Fetched spot images successfully");
            return res.status(200).sendFile(result.data[result.data.length - 1].path); //path to picture on filesystem
        }else{
            info(fileLabel, "Could not fetch profile image");
            return res.status(400).json({"success": false});
        }
    }).catch((exception)=>{
        error(fileLabel, "Error while getting profile image: " + exception )
        return res.status(400).json({"success": false, "error": exception});
    });

    res.sendFile();
});


// router.post("/profile-image/:userId", upload.single('file'), (req, res, cb) => {
//     console.log(req.file);
//     //console.log(req.files);
//     var newImage = {userId:req.params.userId,path:req.file.path};
//     console.log(newImage);
//     return imageSQL.uploadProfilePicture(newImage).then((result) => {
//         if(result.success){            
//             if (result.data){
//                 console.log("Previous path: " + result.data);
//                 console.log("New path: " + newImage.path);
//                 fs.unlinkSync(result.data);
//             }
//             return res.status(201).json({"success": true});
//         } else {
//             return res.status(400).json({"success": false});
//         }
//     }).catch((exception) => {
//         return res.status(400).json({"success": false, "error": exception});
//     });

// });


router.post("/profile-image/:userId", upload.single('file'), (req, res, cb) => {
    console.log(req.file);
    //console.log(req.files);
    var encoded_image = req.file.buffer.toString("base64");
    var newImage = {userId:req.params.userId,image:encoded_image};
    console.log(newImage);

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
  