// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

// sends SMS texts using twilio

var vso = require("vso-node-api");

var twilio = require('twilio');

module.exports = function (configuration) {

	var sendingNumber = configuration.sendingNumber;

	var sendSms = configuration.sendSms;

	var twilioClient = twilio(configuration.accountSid, configuration.authToken);

	return {
		"sendSMS": function (message, toNumber, onSucess, onError) {
			console.log("sending " + message + " to " + toNumber);
			if (sendSms) {
				twilioClient.sendSms({
					to: toNumber,
					from: sendingNumber,
					body: message
				}, function (err, data) {
					if (err) {
						console.log("SMS send failed" + err.status + " " + err.message);
						onError(err.status, err.message);
					} else if (onSucess) {
						onSucess();
					}
				});
			} else {
				console.log("fake sending " + message + " to " + toNumber);

				if (onSucess) {
					onSucess();
				}
			}
		}
	}
}