'use strict'

var express = require('express'); 
var EventController = require('../controllers/event'); 
var DataLoader = require('../data/DataLoader'); 
var api = express.Router();

let loadData = function  (req, res) {
    let dataLoader = new DataLoader()
    return dataLoader.load(req, res)
}

api.get('/events/load',loadData); 

api.get('/events',EventController.getEvents); 
api.get('/events/:title/:id',EventController.getEvent); 

api.get('/locations',EventController.getLocations); 
api.get('/locations/:id',EventController.getLocation); 
api.get('/districts',EventController.getDistricts); 

api.get('/events/categories',EventController.getCategories); 

api.get('/events/types',EventController.getTypes); 

module.exports = api; 
