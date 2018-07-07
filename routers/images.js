/*
 * YABE - Post router
 */
"use strict";

const express  = require("express");
const auth    = require("../auth");

/* our applications modules */
const ImgStore = require("../models/image");
const multer   = require('multer', { dest: 'uploads/' });
const router   = new express.Router();

var upload = multer();

// create an image entry in database
router.post("/", function (req, res, next) {
    const input = req.body;
    ImgStore.create(input).then(created => {
        return res.status(201 /* Created */).send(created);
    }).catch(next);
});

router.post('/', auth.basic(), upload.single('image_field_name'), function (req, res, next) {
    console.log(req.file);
    Image.create({
        user: req.locals.user,
        owner:  req.body.owner,
        type:   req.body.owner,
        filename : req.file.destination + '/' + req.file.filename,
        description : req.body.description
    }).then(created => {
        return res.status(201 /* Created */).send(created);
    });

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

// read all the images
router.get("/", (req, res, next) => {
    ImgStore.find({/* no conditions */}).then(results => {
        return res.send(results);
    }).catch(next);
});

// read all the images of one user
router.get("/user/:user_id", (req, res, next) => {
    const userId = req.params.user_id;
    ImgStore.find({user_id}).then(results => {
        return res.send(results);
    }).catch(next);
});

// read one post
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    // callback example
    ImgStore.findById(id, (err, found) => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    });
});

// update
router.put("/:id", (req, res, next) => {
    const id    = req.params.id;
    const input = req.body;
    const promise = ImgStore.findByIdAndUpdate(id, input, {overwrite: true, new: true});
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next);
});

// partial update
router.patch("/:id", (req, res, next) => {
    const id    = req.params.id;
    const input = req.body;
    const promise = ImgStore.findByIdAndUpdate(id, {$set: input}, {new: true})
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next);
});

// delete an Image reference and image
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    ImgStore.findByIdAndRemove(id).then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next)
});

// expose our router to require()
module.exports = router;
