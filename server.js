	//create app with express.
	var express  = require('express');
	var app      = express(); 		

	// set the port.		
	var port = 3000 || process.env.OPENSHIFT_NODEJS_PORT; 

	// set the ip.	
	var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

	//Reads a form's input, javascript object accessible through `req.body` in routes.js								
	var bodyParser = require('body-parser');

	// set the static files location (pages, css, js, components)
	app.use(express.static(__dirname + '/public')); 		

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json()); // parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

	//Routes MongoDB.
	require('./app/routes.js')(app);

	//Start with 'node server.js'
	app.listen(port, ipaddress, function() {
	            console.log('%s: JAVALI server started on %s:%d ...',
	                        Date(Date.now() ), ipaddress, port);
	});
