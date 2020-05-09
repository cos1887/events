
'use strict'

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var TypeSchema = new Schema({
    id: String,
    value: String, 
    type: String, 
    tags: Array
}); 

module.exports = TypeSchema; 