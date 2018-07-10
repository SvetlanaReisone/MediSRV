/*
 * Medicals - Personal model
 */

"use strict";

const mongoose = require("mongoose");

/* Schema */
const personalSchema = new mongoose.Schema({
    user_id: String,
    firstname:  String,
    lastname:   String,
    date_birth : Date,
    weight : Number,
    blood_group: String
});

/* Model */
const Personal = mongoose.model('Personal', personalSchema, 'personals');

/* expose Post to require() */
module.exports = Personal;