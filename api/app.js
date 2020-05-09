const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const cors = require('cors');
const axios = require('axios');

const events_router = require('./routes/event')

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',events_router);


app.get('/events/list', function (req, res) {

    const urlEvents = 'https://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=json&file=0&filename=206974-0-agenda-eventos-culturales-100&mgmtid=6c0b6d01df986410VgnVCM2000000c205a0aRCRD';
    axios.get(urlEvents)
        .then(response => {
            console.log(response.data["@graph"]);
        res.send(response.data["@graph"]);
        })
        .catch(error => {
        console.log(error);
        });
  
  
});



module.exports = app; 