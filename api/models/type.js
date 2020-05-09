'use strict'

var mongoose = require('mongoose'); 
var TypeSchema= require('./schemas/type'); 
module.exports = mongoose.model('Type', TypeSchema); 