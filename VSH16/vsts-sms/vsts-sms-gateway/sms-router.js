// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

// Implements the router responsable for handling SMS commands from twilio
// and executes the command handler for the command the user issued 
// sends the response (that is generated from the command handler)
// back to the user to the same mobile number

var express = require('express');

var router = express.Router();
var smsSender;

// Load all commands and it's handlers
var commandHandlers;

module.exports = function (configuration,storage) {

  var vsoFactory = require("./vso-factory")(configuration,storage);
  commandHandlers = require('./commands')(configuration, vsoFactory);

  smsSender = require('./smsSender')(configuration);

  router.get('/sms', function (req, res) {
    res.send('use post');
  });

  router.post('/sms', function (req, response) {
    console.log("matching SMS " + req.body.Body);

    var body = req.body.Body.replace("Sent from your Twilio trial account - ", "");

    console.log("processing message " + body);

    var words = body.split("#");
    var command = words[0].toLowerCase();

    console.log("evaluating command " + command);

    if (typeof (commandHandlers[command]) === "undefined") {
      response.send('invalid command ' + command);
    } else {
      // Get the command handler callback
      var commandHandler = commandHandlers[command];

      var context = {
        message: body,
        from: req.body.From,
        username:req.body.From
      };

      // Call the command handler. The first parameter is the callback to be called by the handler
      // the rest of the parameters are the individual words passed by SMS (minus the command name)
      commandHandler.apply(this,
        [function (message) {
          smsSender.sendSMS(message, req.body.From,
            function () {
              console.log("sms sent")
              response.send(message);
            },
            function (error) {
              console.log("ERROR SENDING SMS" + error);
            });
        }, context].concat(words.slice(1)));
    }
  });

  return router;
}