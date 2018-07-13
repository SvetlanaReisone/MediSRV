/*
 * Medicals - Medication model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const medicationSchema = new mongoose.Schema({
    personal_id:  {type: String, required: true},
    name:    {type: String, required: true},
    from_date : {type:Date, default: Date.now},
    to_date :  {type:Date},
    posologie : {type: String},
    image_id:  {type: String}
});

/* Model */
const Medication = mongoose.model('Medication', medicationSchema, 'medications');

/* expose Post to require() */
module.exports = Medication;