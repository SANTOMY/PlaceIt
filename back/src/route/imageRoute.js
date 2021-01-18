const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');

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


router.post("/spot-image", upload.single('file'), function(req, res) {
    console.log(req.file);
    console.log(req.files);

    return res.status(201).json({"success": true}); // success
    //For variable destination
    //     var dir = JSON.parse(req.body.data).directory;
    // var filename = req.file.filename;

    // fs.move('../tempDir/' + fileName, '../tempDir/' + dir + '/' + fileName, function (err) {
    //     if (err) {
    //         return console.error(err);
    //     }
});

module.exports = router;