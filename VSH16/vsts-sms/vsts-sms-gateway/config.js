// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

var cfg = {};

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

cfg.vso = {};
cfg.OAuth = {};

cfg.vso.authType = process.env.VSO_AUTH_TYPE;
cfg.vso.server = process.env.VSO_SERVER;
if(cfg.vso.authType !== "oauth") {
  cfg.vso.user = process.env.VSO_USER;
  cfg.vso.password = process.env.VSO_PASSWORD;
} else {
  cfg.OAuth.appId = process.env.OAUTH_APPID;
  cfg.OAuth.appSecret = process.env.OAUTH_APPSECRET;
  cfg.OAuth.scope = process.env.OAUTH_SCOPE;
  cfg.OAuth.callbackUrl = process.env.OAUTH_CALLBACKURL;
}

cfg.publicUrl = process.env.SMS_PUBLIC_URL;

// Really send SMS
cfg.sendSms = true;

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;