/*
 * Medicals - Personal model
 */

"use strict";

const mongoose = require("mongoose");

/* Schema */
const personalSchema = new mongoose.Schema({
    user_id:  {type: String, required: true},
    firstname:   {type: String, required: true},
    lastname:   {type: String, required: true},
    date_birth : {type: Date},
    weight : {type: Number},
    blood_group:  {type: String}
});

/* Model */
const Personal = mongoose.model('Personal', personalSchema, 'personals');

/* expose Post to require() */
module.exports = Personal;