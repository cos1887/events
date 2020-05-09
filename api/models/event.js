'use strict'

var mongoose = require('mongoose'); 
var EventSchema= require('./schemas/event'); 
module.exports = mongoose.model('Event', EventSchema); 