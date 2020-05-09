
'use strict'

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var LocationSchema = new Schema({
    id: String,
    link: String,
    name: String, 
    accesibility: Boolean, 
    latitude: Number, 
    longitude: Number,
    street: String, 
    postalCode: String, 
    city: String, 
    area: String, 
    district: String, 
    districtId: String, 
}); 

module.exports = LocationSchema; 