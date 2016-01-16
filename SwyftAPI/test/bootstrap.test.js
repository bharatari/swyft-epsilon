var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var Barrels = require('barrels');
var Sails = require('sails'),
    sails;

/**
 * Using Mocha programatically due to issues when
 * Mocha would load files that used sails.config
 * values before Sails was lifted and then throw errors
 * that sails was undefined.
 *
 * This method allows us to load files only after sails has been
 * lifted.
 */

// Instantiate a Mocha instance.
var mocha = new Mocha();

Sails.lift({
    // configuration for testing purposes
    environment: 'test'
}, function(err, server) {
    sails = server;
    if (err) return;

    // here you can load fixtures, etc.
    var barrels = new Barrels();

    barrels.populate(function(err) {
        test();
    });
});

function test() {
  // Add each .js file to the mocha instance
  fs.readdirSync('test/unit/services').filter(function(file){
      // Only keep the .js files
      return file.substr(-3) === '.js';

  }).forEach(function(file){
      mocha.addFile(
          path.join('test/unit/services', file)
      );
  });

  // Add each .js file to the mocha instance
  fs.readdirSync('test/unit/controllers').filter(function(file){
      // Only keep the .js files
      return file.substr(-3) === '.js';

  }).forEach(function(file){
      mocha.addFile(
          path.join('test/unit/controllers', file)
      );
  });

  mocha.addFile('test/after.test.js');

  // Run the tests.
  mocha.run(function(failures){
    process.on('exit', function () {
      process.exit(failures);
    });
  });
}
