/*
 * Medicals - Personal router
 */
"use strict";

const express = require("express");
const auth    = require("../auth");
/* our applications modules */
const Personal = require("../models/personal");

const router = new express.Router();

// read all the personal
router.get("/", (req, res, next) => {
    Personal.find({}).then(results => {
        return res.send(results);
    }).catch(next);
});


// read all the personal of one user
router.get("/:uid", 
    (req, res, next) => {
    const userId = req.params.uid;
    Personal.find({user_id: userId}).then(results => {
        return res.send(results);
    }).catch(next);
});

// add personal data document
router.post('/',
    function (req, res, next) {
        Personal.create({
            user_id: req.body.user_id,
            firstname:  req.body.firstname,
            lastname:   req.body.lastname,
            date_birth : req.body.date_birth,
            weight : req.body.weight,
            blood_group: req.body.blood_group
        }).then(created => {
            return res.status(201 /* Created */).send(created);
        });
    });

    // partial update personal data 
router.patch("/:id", (req, res, next) => {
    const id    = req.params.id;
    const input = req.body;
    const promise = Personal.findByIdAndUpdate(id, {$set: input}, {new: true})
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next);
});


// expose our router to require()
module.exports = router;
