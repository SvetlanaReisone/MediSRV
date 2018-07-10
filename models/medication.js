/*
 * Medicals - Medication model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const medicationSchema = new mongoose.Schema({
    personal_id:  String,
    name:   String,
    from_date : Date,
    to_date : Date,
    posologie :String,
    image_id: String
});

/* Model */
const Medication = mongoose.model('Medication', medicationSchema, 'medications');

/* expose Post to require() */
module.exports = Medication;