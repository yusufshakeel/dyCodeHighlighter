/*!
 * dyCodeHighlighter
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyCodeHighlighter
 *
 * MIT license
 * Copyright (c) 2017 Yusuf Shakeel
 *
 * Date: 2015-01-09 Friday
 */
module.exports = function(grunt) {

    // project configurations
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssmin : {
            target : {
                src : ["src/css/dycodehighlighter.css"],
                dest : "dist/css/dycodehighlighter.min.css"
            }
        },

        uglify: {
            distVersion: {
                options : {
                    banner : "/*!\n" +
                    " * dyCodeHighlighter\n" +
                    " *\n" +
                    " * Author: Yusuf Shakeel\n" +
                    " * https://github.com/yusufshakeel\n" +
                    " *\n" +
                    " * GitHub Link: https://github.com/yusufshakeel/dyCodeHighlighter\n" +
                    " *\n" +
                    " * MIT license\n" +
                    " * Copyright (c) 2017 Yusuf Shakeel\n" +
                    " *\n" +
                    " * Date: 2015-01-09 Friday\n" +
                    " * Build: <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> \n" +
                    " */",
                    mangle: true
                },
                files: {
                    'dist/js/dycodehighlighter.min.js': [
                        'src/js/dycodehighlighter.js'
                    ]
                }
            }
        }

    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // create default task
    grunt.registerTask("default", ["cssmin", "uglify:distVersion"]);

};