/*
 * Medicals - ImgStore model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const imageSchema = new mongoose.Schema({
    user: {type:Object, required:true},
    owner:  {type: String, required: true},
    type: {type: String, required: true},
    filename : {type: String, required: true, unique: true},
    description : {type: String}
});

/* Model */
const Image = mongoose.model('Image', imageSchema, 'images');

/* expose Post to require() */
module.exports = Image;