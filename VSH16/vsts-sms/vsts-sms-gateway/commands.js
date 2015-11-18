// Copyright 2015 Tiago Pascoal 
// Demo code built for VSLive Orlando 2015
// more info at http://pascoal.net/vslive-orlando15

module.exports = function (configuration, vsoConnectionFactory) {
    var vsoConnFactory = vsoConnectionFactory;
    return {
        "build": function (callback, context, teamProject, buildName) {

            console.log("checkin team project ->" + teamProject);
            console.log("cheking buildName ->" + buildName);

            vsoConnFactory.createConnection(context.username, function (connection) {
                var buildApi = connection.getBuildApi();

                buildApi.getDefinitions(teamProject, buildName, null,
                    function (error, statusCode, definitions) {

                        if (statusCode === 200) {
                            var definitionId = definitions[0].id;
                            var build = { "definition": { "id": definitionId } };
                            
                            buildApi.queueBuild(build, teamProject, false, function (e, statusCode, build) {
                                if (statusCode === 200) {
                                    callback(buildName + " Queued on " + teamProject);
                                } else {
                                    console.log("queued failed " + statusCode + " " + e);
                                    callback("queue failed");
                                }
                            });
                        } else {
                            callback("Unknown project or build " + statusCode);
                        }
                    });
            },
            function(error) {
                callback(error);    
            }
            );
        }       
        
    }

}
