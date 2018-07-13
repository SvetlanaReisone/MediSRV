/*
 * Medicals - Medication router
 */
"use strict";

const express = require("express");
const auth    = require("../auth");
/* our applications modules */
const Medication = require("../models/medication");

const router = new express.Router();


// read all medications of a person  
router.get("/:pid", 
    (req, res, next) => {
    const personId = req.params.pid;
    Medication.find({personal_id: personId}).then(results => {
        return res.send(results);
    }).catch(next);
});


// add medicatioin data document
router.post('/',
    function (req, res, next) {
        Medication.create({
            personal_id: req.body.personal_id,
            name: req.body.name,
            from_date : req.body.from_date,
            to_date :  req.body.to_date,
            posologie : req.body.posologie
        }).then(created => {
            return res.status(201 /* Created */).send(created);
        }).catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(400 /* Bad Request */).send({
                    message: err.message
                });
            }
            return next(err);
        });;
    });

    // partial update medication data 
router.patch("/:id", (req, res, next) => {
    const id    = req.params.id;
    const input = req.body;
    const promise = Medication.findByIdAndUpdate(id, {$set: input}, {new: true})
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next);
});

//delete medication

router.delete("/:id", 
            // delete file reference and collection document
    (req, res, next) => {
        const id = req.params.id;
        Medication.findByIdAndRemove(id).then(found => {
            if (found)
                return res.send(found);
            else
                return res.status(404 /* Not Found */).send();
        }).catch(next)
});


// expose our router to require()
module.exports = router;
