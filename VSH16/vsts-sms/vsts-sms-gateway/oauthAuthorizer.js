// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

//************************************************
// Modulo to manage the OAuth dance.
// 
// Needs to be initialized with the configuration settings object and the datastore
// Although it can be used as a starter point for your own OAuth dance, it lightly tied
// to twilio (actually just an module called sms-sender (which is tied to twillio but
// Uses to VSO OAuth endpoints to do the OAuth dance and implements express routes to 
// handle OAuth callback calls on our side can be changed))

var path = require("path");
var express = require('express');
var uuid = require("node-uuid");
var request = require("request");

var router = express.Router();
var configuration;
var storage;
var smsSender

function getToken(configuration, authorizationCode, onSucess, onError) {

  request.post("https://app.vssps.visualstudio.com/oauth2/token",
    {
      form: {
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion": configuration.OAuth.appSecret,
        "response_type": "Assertion",
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": authorizationCode,
        "redirect_uri": configuration.OAuth.callbackUrl
      }
    },
    function (err, res, responseBody) {
      console.log("ERR" + err);
      console.log("status" + res.statusCode);

      if (err) {
        onError(err);
      } else if (res.statusCode != 200 && res.statusCode != 400 && res.statusCode != 401) {
        onError("Error Code " + res.statusCode);
      } else {
        onSucess(JSON.parse(responseBody));
      }
    });
}

module.exports = function (configuration, dataStore) {

  storage = dataStore;
  smsSender = require('./sms-sender')(configuration);

  router.post('/associate', function (request, response) {

    if ((request.body.verificationCode || "") !== "") {

      var state = request.cookies.__state;

      console.log("verifying " + request.body.verificationCode + " for state " + state);

      var userData = storage.getData("__state" + state);

      if (!userData || userData.verification != request.body.verificationCode) {
        console.log("invalid code should have been " + request.body.verificationCode);
        response.status(200);
        response.sendFile(path.join(__dirname, 'public', 'entercode.html'));
      } else {
        var autorizationURL = configuration.publicUrl + "/startAuthorization?state=" + state;
        response.redirect(autorizationURL);
      }
      return;

    } else {
      console.log("going to authorize " + request.body.phoneNumber);
      var state = uuid.v4();
      var verificationCode = Math.floor(Math.random() * 100000);

      // Store verification data
      storage.putData("__state" + state, { mobile: request.body.phoneNumber, verification: verificationCode });

      response.cookie('__state', state, { httpOnly: true });

      var autorizationURL = configuration.publicUrl + "/startAuthorization?state=" + state;

      var autorizationMessage = "Enter verification code " + verificationCode + " or click " + autorizationURL;

      smsSender.sendSMS(autorizationMessage, request.body.phoneNumber,
        function () {
          console.log("code sent");
          response.status(200);
          response.sendFile(path.join(__dirname, 'public', 'entercode.html'));
        },
        function (error) {
          //TODO:
        });
    }
  });

  router.get("/startAuthorization", function (request, response) {

    var state = request.query.state;

    var autorizationURL = "https://app.vssps.visualstudio.com/oauth2/authorize?client_id=" + configuration.OAuth.appId
      + "&response_type=Assertion&state=" + state
      + "&scope=" + configuration.OAuth.scope
      + "&redirect_uri=" + configuration.OAuth.callbackUrl;

    console.log("going to redirect to" + autorizationURL);
    response.redirect(autorizationURL);
  });

  router.get("/callback", function (request, response) {
    console.log("CALLBACK ");

    console.log("code " + request.query.code);
    console.log("state " + request.query.state);

    var userData = storage.getData("__state" + request.query.state);

    getToken(configuration, request.query.code,
      function (body) {
        console.log("received " + JSON.stringify(body));

        // Calculate absolute expiration date (minutes a 1 minute error margin), since expires at it is relative 
        body.expirationDate = new Date();
        body.expirationDate.setSeconds(body.expirationDate.getSeconds() + parseInt(body.expires_in) - 60);
        
        // Store authorization data for later (if we need to refresh it)        
        storage.putData(userData.mobile, body);

        smsSender.sendSMS("Authorization accepted number " + userData.mobile, userData.mobile,
          function () {

            response.status(200);
            response.sendFile(path.join(__dirname, 'public', 'authorized.html'));
          },
          function (error) {
            response.status(200);
            response.sendFile(path.join(__dirname, 'public', 'failedsms.html'));
          });
      },
      function (error) {
        response.status(200);
        response.sendFile(path.join(__dirname, 'public', 'entercode.html'));
      });
  });

  return router;
}