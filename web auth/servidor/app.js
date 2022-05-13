const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const {API_VERSION} = require('./config');


// Load rountings
//...


app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());


//Configure Header HTTP
//...



//Routes basic
//...


module.exports = app;
