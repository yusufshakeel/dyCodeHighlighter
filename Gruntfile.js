module.exports = function(grunt) {

    //project configurations
    grunt.initConfig({

        cssmin : {
            target : {
                src : ["src/css/dycodehighlighter.css"],
                dest : "dist/css/dycodehighlighter.min.css"
            }
        }

    });

    //load cssmin plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //create default task
    grunt.registerTask("default", ["cssmin"]);

};