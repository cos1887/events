'use strict'
const _ = require("lodash"); 
const Event = require('../models/event');
const Type = require('../models/type');
const Location = require('../models/location');
const axios = require('axios');
const cheerio = require('cheerio');
var slugify = require('slugify')

//const URL_EVENTS = 'https://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=json&file=0&filename=206974-0-agenda-eventos-culturales-100&mgmtid=6c0b6d01df986410VgnVCM2000000c205a0aRCRD';
const URL_EVENTS='https://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=json&file=0&filename=300107-0-agenda-actividades-eventos&mgmtid=57be24206a91b510VgnVCM2000001f4a900aRCRD&preview=full'
const MAX_TOTAL_EVENTS = 1000; 

class DataLoader {

    async load (req, res) {
        console.log("[DataLoader.load] init", this)
        let response = await axios.get(URL_EVENTS); 
        this.categories = await this._getCategories();
      
        if(response && response.data ) {
            let data = response.data["@graph"] || []; 
            console.log("[DataLoader.load] Done")
            this._getHtmlData(data,0, res);
        } else {
            console.log("[DataLoader.load][Error] Loading the main api data");
        }
    }
    
    async _getHtmlData (data,id, res)  {
        let dataEvent = data[id];
        try {
            let response = await axios.get(dataEvent.link); 
            if(response && response.data) {
                if ( dataEvent.title && dataEvent.link ) {
                    this._addTypeEvent(dataEvent); 
                    this._addEvent(dataEvent, response.data); 
                    this._addLocation(dataEvent); 
                    console.log(" ++ event added ("+id +"): " , dataEvent.title.substring(0,100))
                }

                let next = parseInt(id+1,10); 
                if( id<data.length && data[next] && next<MAX_TOTAL_EVENTS)  {
                    this._getHtmlData(data,next, res)
                } else {
                    res.send({message: next + " Events loaded"}); 
                }
            }
        } catch(e) {
            console.log("[scrapping][Error] ",dataEvent.id+", "+ dataEvent.title);
            let next = parseInt(id+1,10); 
            if( id<data.length && data[next] && next<MAX_TOTAL_EVENTS)  {
                this._getHtmlData(data,next, res)
            } else {
                res.send({message: next + " Events loaded"}); 
            }
        }
    }

    async  _getCategories () {
        let categories =  await Type
            .find(null, {"_id":0, "__v":0})
            .exec(); 

        let categoriesGroupById = {}
        for (var x =0; x< categories.length; x++) {
            let category = categories[x]; 
            categoriesGroupById[category.id] = category; 
        }
        return categoriesGroupById; 
    }

    async _getHTMLLevel2 (path) { 
       
        if(path.indexOf("/portales/munimadrid/")===-1){
            return ""; 
        } 

        let content = await axios.get(`https://www.madrid.es/${path}`); 
        const $2 = cheerio.load(content.data)
        const $html2 = $2('.tramites-content');
        let imgPath2 = $html2.find('img').attr('src'); 
        console.log("imgPath2-->", imgPath2)
        return imgPath2; 
    }

    _getImageByDefault (title) {
        
        const IMG_TALES = 'https://cdn.pixabay.com/photo/2019/05/14/21/50/storytelling-4203628_960_720.jpg'; 
        const IMG_ADVENTURE = 'https://cdn.pixabay.com/photo/2017/07/22/11/46/adventure-2528477_960_720.jpg'; 
        const IMG_PHOTO = 'https://cdn.pixabay.com/photo/2017/09/09/18/22/camera-2732926_960_720.jpg'
        const IMG_HUERTA = 'https://cdn.pixabay.com/photo/2015/04/27/15/01/vegetables-742095_960_720.jpg'
        const IMG_WALKING = 'https://cdn.pixabay.com/photo/2011/11/16/16/03/mother-10516_960_720.jpg'; 
        const IMG_BICI = 'https://cdn.pixabay.com/photo/2017/07/14/08/55/bike-2503157_960_720.jpg'; 
        const IMG_BIRDS = 'https://cdn.pixabay.com/photo/2016/12/07/09/20/ornithology-1888985_960_720.jpg'; 
        const IMG_MAP= 'https://cdn.pixabay.com/photo/2014/06/02/14/38/folding-map-360382_960_720.jpg'
        const IMG_MUSIC= 'https://cdn.pixabay.com/photo/2014/03/04/07/14/music-279333_960_720.jpg'
        const IMG_BOOKS= 'https://cdn.pixabay.com/photo/2015/05/15/14/21/books-768426_960_720.jpg'
       
        title = title.toLowerCase();

        if( title.indexOf("cuenta cuentos")!==-1 || title.indexOf("cuentacuentos")!==-1 ) {
            return IMG_TALES; 
        }

        if( title.indexOf("aventura")!==-1 ) {
            return IMG_ADVENTURE; 
        }

        if( title.indexOf("fotografía")!==-1  ) {
            return IMG_PHOTO; 
        }

        if( title.indexOf("huerta")!==-1 || title.indexOf("huerto")!==-1 ) {
            return IMG_HUERTA; 
        }

        if( title.indexOf("senderismo")!==-1 ) {
            return IMG_WALKING; 
        }

        if( title.indexOf("ornitológico")!==-1  || title.indexOf("ornitología")!==-1 ) {
            return IMG_BIRDS; 
        }

        if( title.indexOf("itinerarios guiados")!==-1 ) {
            return IMG_MAP; 
        }

        if( title.indexOf(" bici ")!==-1 || title.indexOf("bicicleta")!==-1 ) {
            return IMG_BICI; 
        }

        if( title.indexOf("canción")!==-1 || title.indexOf("caciones")!==-1 ||  title.indexOf("música")!==-1) {
            return IMG_MUSIC; 
        }

        if( title.indexOf(" libro")!==-1 || title.indexOf(" lectura")!==-1 ) {
            return IMG_BOOKS; 
        }
        return null; 

    }

    async _addEvent(dataEvent, response) {
        const event = new Event(); 
        const $ = cheerio.load(response)
        const $html = $('.tramites-content');

        event.id = dataEvent.id; 
        event.title = dataEvent.title; 

        const desc = $html.find('.tiny-text').find('p').map(function() {
            let text = $(this).text().trim(); 
            return (
                this.type === 'tag' && 
                this.name === 'p' && 
                text !==''
            ) ? text +'. ' : '';
        }).get().join('');
        
        const imagePathAux = $html.find('a')[0]
        let imgPath2 = '';
        if(imagePathAux){
            let path = imagePathAux.attribs.href; 
            if(path.indexOf("/portales/munimadrid/")===-1){
                return ""; 
            } 
            let content = await axios.get(`https://www.madrid.es/${path}`); 
            const $2 = cheerio.load(content.data)
            const $html2 = $2('.tramites-content');
            imgPath2 = $html2.find('img').attr('src'); 
       
        }
        
        let imgPath = $html.find('img').attr('src') || imgPath2
        const srcImg = (imgPath)? `https://www.madrid.es/${imgPath}` : this._getImageByDefault(event.title); 
 
        event.description = dataEvent.description || desc
        event.link = dataEvent.link;
        event.img = srcImg; 
        event.dateStart = new Date(dataEvent.dtstart).getTime();
        event.dateEnd =  new Date(dataEvent.dtend).getTime();
        event.ephemeral = (dataEvent.time)? true:false;
        
        if(dataEvent['@type']) {
            let typeObj = this.categories[dataEvent['@type']]; 
            event.type = typeObj.type; 
        } else {
            event.type = "Otros"; 
        }

        if(dataEvent.audience) {
            event.audience = dataEvent.audience.split(","); 
        }
        let locationData = this._getLocationData(dataEvent); 
        if (locationData) {
            event.location = {
                id: locationData.id, 
                area: locationData.area,
                name:locationData.name,
                link: locationData.link, 
                accesibility: locationData.accesibility, 
                latitude: locationData.latitude,
                longitude:locationData.longitude, 
                street: locationData.street,
                postalCode: locationData.postalCode, 
                city: locationData.city,
                districtId: locationData.districtId, 
                district: locationData.district 
            }
        } 
        this._save(Event, event) 
    }

    _getLocationData(dataEvent) {
        const ACCESIBILITY = "1"; 
        let address = dataEvent.address || {}; 
        let area = address.area || {}; 
        let street = area["street-address"]; 

        if(!street) {
            return null
        }
        
        let districtId = address.district || {}; 
        let coords = dataEvent.location || {}; 
        let organization = dataEvent.organization || {}; 
        let districtData = (districtId["@id"])? districtId["@id"].split("\/"):null;
        
        return {
            id: slugify(area["street-address"]),
            area: area["@id"],
            name: dataEvent['event-location'],
            link: area["@id"],
            accesibility: (organization.accesibility === ACCESIBILITY),
            latitude: coords.latitude,
            longitude:coords.longitude,
            street: area["street-address"],
            postalCode: area["postal-code"],
            city: area.locality,
            districtId: districtId["@id"],
            district: (districtData)? districtData[districtData.length-1]:null
        }
    }

    _addLocation(dataEvent) {

        let location = new Location(); 
        let locationData = this._getLocationData(dataEvent); 
        if (locationData) {
            location.id = locationData.id; 
            location.area = locationData.area; 
            location.name = locationData.name; 
            location.link = locationData.link; 
            location.accesibility = locationData.accesibility; 
            location.latitude = locationData.latitude; 
            location.longitude = locationData.longitude; 
            location.street = locationData.street; 
            location.postalCode = locationData.postalCode; 
            location.city = locationData.city; 
            location.districtId = locationData.districtId; 
            location.district = locationData.district; 

            this._save(Location, location); 
        }
    }

    _addTypeEvent(dataEvent){
        let type = new Type(); 
        type.id = dataEvent['@type']; 
        this._save(Type, type) 
    }

    _save(Model, instance) {
        Model.find({id:instance.id}).exec((err, recordData)=>{
            let dataIsNew = (recordData.length === 0); 
            if(dataIsNew) {
                instance.save((err, ok) => {
                    if(err){
                        console.log("err", err);
                    }  
                })
            }
        })
    }
}

module.exports = DataLoader; 