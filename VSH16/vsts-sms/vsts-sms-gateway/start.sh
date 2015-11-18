#!/bin/sh

# Copyright 2015 Tiago Pascoal 
# Demo code built for VSLive Orlando 2015
# more info at http://pascoal.net/vslive-orlando15

export TWILIO_ACCOUNT_SID="FILL ME"
export TWILIO_AUTH_TOKEN="FILL ME"
export TWILIO_NUMBER="FILL ME"

# basic, pta or oauth
export VSO_AUTH_TYPE="oauth"
export VSO_SERVER="https://tsp-demo.visualstudio.com/DefaultCollection"

#enter alternate credentials user name or personal access token
export VSO_USER="FILL ME"

# oauth settings
export OAUTH_APPID="FILL ME";
export OAUTH_APPSECRET="FILL ME "
export OAUTH_SCOPE="vso.build_execute";
export OAUTH_CALLBACKURL="https://INSERT FQDN HERE:3001/callback";

export SMS_PUBLIC_URL="https://INSERT FQDN HERE:3001";      

# password (only necessary if not using a personal access token
#export VSO_PASSWORD="FILL ME IF NECESSARU"

nodejs ./server.js