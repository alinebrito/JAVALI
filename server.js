//create app with express.
var express  = require('express');
var app      = express(); 		

// set the port			
var port = 8080; 

//Reads a form's input, javascript object accessible through `req.body` in routesAPI.js								
var bodyParser = require('body-parser');

// set the static files location (pages, css, js, components)
app.use(express.static(__dirname + '/public')); 		

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//Routes MongoDB.
require('./app/routesAPI.js')(app);

//Start with 'node server.js'
app.listen(port);
console.log(new Date() + " INFO: Start Project JAVALI, listening on port " + port);
