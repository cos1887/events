'use strict'

var mongoose = require('mongoose'); 
var LocationSchema= require('./schemas/location'); 
module.exports = mongoose.model('Location', LocationSchema); 