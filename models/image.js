/*
 * Medicals - ImgStore model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const imageSchema = new mongoose.Schema({
    user: Object,
    owner:  String,
    type:   String,
    filename : String,
    description : String
});

/* Model */
const Image = mongoose.model('Image', imageSchema, 'images');

/* expose Post to require() */
module.exports = Image;