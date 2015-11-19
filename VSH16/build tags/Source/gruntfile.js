/// <binding BeforeBuild='exec:package' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        exec: {
            package: {
                command: "vset package -s settings.vset.json",
                stdout: true,
                stderr: true
            },
            publish: {
                command: "vset publish -s settings.vset.json",
                stdout: true,
                stderr: true
            }
        }
    });

    grunt.loadNpmTasks("grunt-exec");
};