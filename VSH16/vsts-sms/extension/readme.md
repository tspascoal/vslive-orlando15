#VSH16 Build Tag Demo source code

Allows an user to associate and authorize a mobile phone number with an account 

This demo uses [third party hosting](https://www.visualstudio.com/en-us/integrate/extensions/develop/static-content) you need to publish the companion server code at a publically
accessible internet server.

### Configuring the extension

Before uploading the extension you need to update the following fields on the [vss-extension.json manifest file](source/vss-extension.json):

* *baseUri* - The base URI where the application is installed. The site needs to be hosted using HTTPS and available on a browser (doesn't need to be available on the internet)
	* Replace  REPLACE WITH YOUR FQDN HOST NAME HERE token with your fully qualified domain name host
* *publisher* - your publisher identifier ([you need to register your publisher id in the market place](https://www.visualstudio.com/en-us/integrate/extensions/publish/overview))
	* Replace the REPLACE WITH YOUR PUBLISHER IDENTIFIER token on the manifest file

### Compiling

Before compiling the code, you need to get the required dependencies, for that you just need to issue the `npm install` command in the base extension folder

you are now ready to compile the extension. Either using
* Visual studio by running the package grunt task 
	* VS 2015 has native support for Task Runner Explorer 
	* VS 2013 requires the [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708) extension 
* Visual studio code 
* Manually running the package task in the provided [grunt](http://gruntjs.com/) file)
* run the `vset package` command (the [vset](https://www.npmjs.com/package/vset) command line tool can package and publish extensions)

### Publishing & Installing

* Publish the extension on the [marketplace](https://app.market.visualstudio.com/manage) 
* Share the extensions on the account(s) you wish to install it
* Install the extension on the account(s) you want to enable the extension on

More info how to [publish an extension](https://www.visualstudio.com/en-us/integrate/extensions/publish/overview)

All code is copyright Tiago Pascoal and licensed under the MIT license (see [license](LICENSE))

Copyright 2015 Tiago Pascoal