// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

// storage abstraction to store key/value pairs.
// Since this is just a demo the values are stored in a json file
// stored on the file system

var fs = require("fs");
var path = require("path");

module.exports = function (configuration) {

	var storagePath = path.join(__dirname, 'data.json');

	return {
		putData: function (key, data) {
			var storageData = {};
			if (fs.existsSync(storagePath)) {
				storageData = JSON.parse(fs.readFileSync(storagePath));
			}

			storageData[key] = data;

			fs.writeFileSync(storagePath, JSON.stringify(storageData));
		},
		getData: function name(key) {
			var storageData = {};
			if (fs.existsSync(storagePath)) {
				storageData = JSON.parse(fs.readFileSync(storagePath));
			}
			return storageData[key];
		}
	}
}