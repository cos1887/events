
'use strict'

var LocationSchema= require('./location'); 
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var EventSchema = new Schema({
    id: String,
    type: String, 
    audience: Array,
    title: String, 
    description: String, 
    dateStart: Date, 
    dateEnd: Date,
    free: Boolean, 
    price: Number,
    link: String, 
    img: String, 
    frecuency: String,
    ephemeral: Boolean,
    location: LocationSchema
}); 

module.exports = EventSchema; 