'use strict'

const mongoose = require('mongoose'); 
const app = require('./app'); 
const port = 3001; 


//mongoose.connect ('mongodb://localhost:27107/example')

mongoose.connect('mongodb://localhost:27017/eventos', {useNewUrlParser: true})
    .then(() => {
        app.listen(port, function () {
            console.log("server running at port", port); 
          });
    })