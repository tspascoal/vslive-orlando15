// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

// VSO factory connection.
// Create a connection that can be used to make calls to VSO regardless of the
// authentication method is being used
//
// Support basic authentication, personal access token and OAuth

var vso = require("vso-node-api");
var request = require("request");

function refreshToken(configuration, refreshToken, onSucess, onError) {

	console.log("using app secret " + configuration.OAuth.appSecret);
	console.log("using callback " + configuration.OAuth.callbackUrl);
	console.log("using refresh token " + refreshToken);

	request.post("https://app.vssps.visualstudio.com/oauth2/token",
		{
			form: {
				"client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
				"client_assertion": configuration.OAuth.appSecret,
				"response_type": "Assertion",
				"grant_type": "refresh_token",
				"assertion": refreshToken,
				"redirect_uri": configuration.OAuth.callbackUrl
			}
		},
		function (err, res, responseBody) {
			console.log("ERR" + err);
			console.log("status" + res.statusCode);

			if (err) {
				onError(err);
			} else if (res.statusCode != 200) {
				onError("Error Code " + res.statusCode);
			} else {
				onSucess(JSON.parse(responseBody));
			}
		});
}

var storage;

module.exports = function (configuration, dataStore) {
	storage = dataStore;

	if (configuration.vso.authType === "oauth") {
		return {
			createConnection: function (user, onSucess, onError) {
				console.log("getting data for user " + user)
				var userData = storage.getData(user);

				if (userData) {
					var now = new Date();
					var expirationDate = new Date(userData.expirationDate);

					if (expirationDate <= now) {
						console.log("refresh token");

						refreshToken(configuration, userData.refresh_token,
							function (body) {

								console.log("REFRESH" + JSON.stringify(body));
							
								// Calculate absolute expiration date (minus a 1 minute error margin), since expires at it is relative 
								userData.expirationDate = new Date();
								userData.expirationDate.setSeconds(userData.expirationDate.getSeconds() + body.expires_in - 60);

								userData.access_token = body.access_token;
								userData.refresh_token = body.refresh_token;
								userData.expires_in = body.expires_in;

								storage.putData(user, userData);

								var conn = new vso.WebApi(configuration.vso.server, vso.getBearerHandler(body.access_token));

								onSucess(conn);
							},
							function (error) {
								console.log("failed to refresh token");
								onError("failed to refresh token");
							});
					} else {
						var conn = new vso.WebApi(configuration.vso.server, vso.getBearerHandler(userData.access_token));
						onSucess(conn);
					}
				} else {
					onError("phone not associated");
				}
			}
		}
	} else {
		return {
			createConnection: function (user, onSucess, onError) {
				var conn = new vso.WebApi(configuration.vso.server, vso.getBasicHandler(configuration.vso.user, configuration.vso.password));
				onSucess(conn);
			}
		}
	}
}