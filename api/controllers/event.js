'use strict'

const Event = require('../models/event');
const Location = require('../models/location');
const Type = require('../models/type');
const wrapperResponse = require('../helpers/schemaResponse/jsonResponse.js');

function getEvent (req, res) { 
    _getDetail(Event, req, res); 
}

function getCategories(req, res) { 
    Type
        .find(null, {"_id":0, "__v":0})
        .exec((err, categories)=> {
            let categoriesGroupById = {}
            for (var x =0; x< categories.length; x++) {
                let category = categories[x]; 
                let id = (category.id)? category.id.split("\/"):""; 
                let type = category.type || "Otros"; 
                let key = type.toLowerCase(); 
                if(id) {
                    id =id[id.length-1]; 
                    if (categoriesGroupById[key]) {
                        categoriesGroupById[key].keys.push(id);
                    } else {
                        categoriesGroupById[key]={
                            value: type, 
                            keys: [id]
                        }
                    }
                }
            }
            _response(res, err, categoriesGroupById)
        })
}

function _getEventsFilters (req) {
    const RANGE_DATE_DAYS_BY_DEFAULT = 100; 
    let filters = {}; 
    let starts =req.param('starts'); 
    let ends =req.param('ends');
    let categories =req.param('categories');
    let districts =req.param('districts');
    let location =req.param('location');

    if(!starts || !ends) {
        starts =  new Date().getTime(); 
        ends = parseInt(starts + 24*60*60*1000*RANGE_DATE_DAYS_BY_DEFAULT, 10); 
    } 
    filters.dateStart = { $gte: starts, $lte: ends} 

    if(categories && categories.split(",").length>0) {
        let categoriesFilter = []
        categories = categories.split(","); 
        for (var x =0; x<categories.length ; x++) {
            categoriesFilter.push({type: categories[x]})
        }
        filters["$or"] =categoriesFilter; 
    }
   
    if(districts && districts.split(",").length>0) {
        let districtsFilter = []
        districts = districts.split(","); 
        for (var x =0; x<districts.length ; x++) {
            districtsFilter.push({'location.district': districts[x]})
        }
        filters["$or"] =districtsFilter; 
    }
    if(location) {
        filters["$or"] =[{'location.id': location}]; 
    }

    return {
        query: filters, 
        resp: {
            dates: {dateStart:starts , dateEnd:ends }, 
            categories:categories, 
            districts: districts, 
            location: location
        }
    }; 
}

function getEvents (req, res) { 
    let filters = _getEventsFilters(req); 
    Event
        .find(filters.query, {"_id":0, "__v":0})
        .sort({dateStart: 1})
        .exec((err, list)=> _response(res, err, list, {filters: filters.resp}))
}

function getLocations (req, res) { 
    _getList(Location, res); 
}
function getDistricts (req, res) { 
    Location
        .find(null, { "__v":0})
        .exec((err, list)=> {
            let districts = []; 
            let districtsIds = []; 
            for(var x=0; x<list.length; x++ ){
                let item = list[x]; 
                if(!districtsIds.includes(item.districtId)){
                    districts.push({
                        name: item.district,
                        id: item.districtId
                    });
                }

                districtsIds.push(item.districtId);
            }
            _response(res, err, districts)
        })
}



function getLocation (req, res) { 
    _getDetail(Location, req, res); 
}

function getTypes (req, res) { 
    Type
        .find(null, {"_id":0, "__v":0})
        .exec((err, list)=> _response(res, err, list))
}

function _getDetail(Model, req, res){
    let id = req.param('id')
    Model
        .find({id},{"_id":0, "__v":0})
        .exec((err, detail)=> _response(res, err, detail))
}

function _getList(Model, res){
    Model
        .find(null, { "__v":0})
        .exec((err, list)=> _response(res, err, list))
}

function _response(res, err, data, extraData) {
    if(err) {
        res.status(500).send(wrapperResponse.getKo(err,1)); 
    } else {
        res.status(200).send(wrapperResponse.getOk(data, extraData)); 
    }
}

module.exports = {
    getEvent,
    getEvents, 
    getDistricts, 
    getLocations, 
    getLocation,
    getTypes, 
    getCategories
}