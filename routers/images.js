/*
 * YABE - Post
 */
"use strict";

const express  = require("express");
const auth    = require("../auth");

/* our applications modules */
const Image = require("../models/image");
//const multer   = require('multer', { dest: 'uploads/' });
const router   = new express.Router();

const multer   = require('multer');
var  upload = multer({dest: 'uploads/'}).single('image_field');


// upload image under "uploads/" folder and  create an image entry in database

router.post('/', auth.basic(), 

                /*upload.single('image_field')  -multer milldeware with multer error handling */
    function (req, res, next) { 
                upload(req, res, function (err) {
                        console.log ('Request BODY:' , req.body)
                        if (err) {
                        console.log ('Multer error: ' , err)
                        return next(err);
                    }
                    // Everything went fine
                    console.log ('WELL')
                    return next();
                   })
                },
                  /*take an uploaded filename and add image enty to image collection */
    function (req, res, next) {
    console.log(req.file);
    Image.create({
        user: req.user,             //req.user filled by auth.basic() middleware
        owner:  req.body.owner,
        type:   req.body.type,
        filename : req.file.destination + '/' + req.file.filename,   //req.file filled by multer middleware
        description : req.body.description
    }).then(created => {
        return res.status(201 /* Created */).send(created);
    });

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

// read all the images
router.get("/", (req, res, next) => {
    Image.find({/* no conditions */}).then(results => {
        return res.send(results);
    }).catch(next);
});

// read all the images of one user
router.get("/user", auth.basic(),
    (req, res, next) => {
    const user = req.user;

    //const userId = req.params.user_id;
    Image.find({user}).then(results => {
        return res.send(results);
    }).catch(next);
});

// read all the images of one user /owner /type
router.get("/user/:owner/:type", auth.basic(),
    (req, res, next) => {
    const user = req.user;
    const owner = req.params.owner;
    const type = req.params.type;
    //const userId = req.params.user_id;
    Image.find({user,owner,type}).then(results => {
        return res.send(results);
    }).catch(next);
});


// read one image data
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    // callback example
    Image.findById(id, (err, found) => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    });
});

// partial update an image data 
router.patch("/:id", (req, res, next) => {
    const id    = req.params.id;
    const input = req.body;
    const promise = Image.findByIdAndUpdate(id, {$set: input}, {new: true})
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next);
});

// delete an Image reference and image
const fs = require('fs');

router.delete("/:id", 

    (req, res, next) => {
        const id = req.params.id;
        console.log('REquest ID, FIRST ',id )
        Image.findById(id, (err, found) => {
            if (found){
                const filename = found.filename;
                try {
                    fs.unlinkSync(filename);
                    console.log('successfully deleted ' + filename);
                    return next();
                } catch (err) {
                    // handle the error
                    return next(err);                    
                }
            }  //if found
            else
                return res.status(404 /* Not Found */).send();
        });
    },

    (req, res, next) => {
        const id = req.params.id;
        console.log('REquest ID, second milldware: ',id )
        Image.findByIdAndRemove(id).then(found => {
            if (found)
                return res.send(found);
            else
                return res.status(404 /* Not Found */).send();
        }).catch(next)
});

// expose our router to require()
module.exports = router;
