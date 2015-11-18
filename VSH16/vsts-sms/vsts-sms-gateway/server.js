// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

// Initialize the HTTP server listener

var HTTPPort = 3000;
var HTTPSPort = 3001;

var fs = require('fs');
var express = require('express');
var app = require('./webapp.js');

app.get('/ping', function (req, res) {
  res.send('Ping. It worked');
});

var serverHttp = app.listen(HTTPPort, function () {
  var host = serverHttp.address().address;
  var port = serverHttp.address().port;

  console.log('vso-sms-gateway listening at http://%s:%s', host, port);
});

// Check if we have certificates to enable HTTPS listener
if (fs.existsSync('cert/key.pem') && fs.existsSync('cert/certificate.pem')) {

  var hskey = fs.readFileSync('cert/key.pem');
  var hscert = fs.readFileSync('cert/certificate.pem');

  var options = {
    key: hskey,
    cert: hscert
  }

  var https = require('https');

  var server = https.createServer(options, app).listen(HTTPSPort, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('vso-sms-gateway listening at https://%s:%s', host, port);
  });
}


