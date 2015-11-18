// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

// sets up server. 
// Reads configurations and sets up the routes (including static files handler)

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var cfg = require('./config');

// Create Express web app
var app = express();


// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming form-encoded HTTP bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse incoming json HTTP bodies (content type application/json)
app.use(bodyParser.json());
app.use(cookieParser());

var storage;

if (cfg.vso.authType === "oauth") {
  storage = require("./storage")(cfg);
}
 
// Configure routes
var smsRouter = require('./sms-router.js')(cfg, storage);
var oauthAutorizer = require('./oauthAuthorizer.js')(cfg, storage);

var router = express.Router();

//routes(router);
app.use(smsRouter);
app.use(oauthAutorizer);

// Handle 404
app.use(function (request, response, next) {
  response.status(404);
  response.sendFile(path.join(__dirname, 'public', '404.html'));
});


// Handle Errors
app.use(function (err, request, response, next) {
  console.error('An application error has occurred:');
  console.error(err.stack);
  response.status(500);
  response.sendFile(path.join(__dirname, 'public', '500.html'));
});

// Export Express app
module.exports = app;