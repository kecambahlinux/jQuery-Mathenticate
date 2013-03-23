/*jshint node: true */
module.exports = function( grunt ) {

"use strict";


grunt.initConfig({
	pkg: "<json:package.json>",

	meta: {
		banner: "/* \n"+
						" * <%= pkg.title %> - v<%= pkg.version %> \n"+
						" * <%= pkg.homepage %> \n"+
						" * \n"+
						" * @author <%= pkg.author.name %> \n"+
						" * <%= pkg.author.url %> \n"+
						" */",
		minified: "/* <%= pkg.title %> - v<%= pkg.version %> */"
	},
	
	concat: {
		dist: {
			src: ['<banner>', 'jquery.mathenticate.js'],
			dest: 'jquery.mathenticate.js'
		}
	},

	min: {
    dist: {
    	src: ['<banner:meta.minified>', 'jquery.mathenticate.js'],
      dest: 'jquery.mathenticate.min.js'
    }
  }

	
});

grunt.registerTask( "default", "concat min" );

};