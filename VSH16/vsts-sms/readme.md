# VSLIVE Orlando 2016 VSH16 SMS Commands Demo

This folder contains the code for SMS commands demo, it allows users who have associated their phone number with a VSTS account to send commands via SMS text messages 

The demo tries to showcase you the following functionality

* using the [REST API](https://www.visualstudio.com/integrate/get-started/rest/basics) via the [vso-node-api](https://www.npmjs.com/package/vso-node-api) library
* using basic authentication/personal access tokens
* Using OAuth authentication to execute API calls on behalf of the user by a third party 

The demos is composed of two parts

* A VSTS Extension so users can associate (and authorize) a mobile phone number directly in the VSTS account context (this is optional, the browser can be pointed directly to the web application)
* A web application (implemented in [nodejs](https://nodejs.org/en/)) that 
	* serves the extension pages 
	* implements SMS handler routes
	* implements OAuth routes


The extensions is stored in the [extension folder](extension) and the wep aplication on [vso-sms-gateway folder](vso-sms-gateway) 



