var Barrels = require('barrels');
var Sails = require('sails'),
    sails;

before(function(done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(10000);

    Sails.lift({
        // configuration for testing purposes
        environment: 'test'
    }, function(err, server) {
        sails = server;
        if (err) return done(err);
        
        // here you can load fixtures, etc.
        var barrels = new Barrels();
        
        barrels.populate(function(err) { 
            done(err, sails); 
        }); 
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    Sails.lower(done);
});