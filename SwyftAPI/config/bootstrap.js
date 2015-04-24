var Agenda = require('agenda');
var moment = require('moment-timezone');
var math = require('mathjs');

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
    UtilityService.protect(function() {
        var agenda = new Agenda();
        agenda.database('swyftdb:Xv56magj@proximus.modulusmongo.net:27017/yju6Wajy');
        agenda.define('deliveryProcessorDev', function(job, done) {
            AutomaticService.processDeliveryPeriods(function() {
                AutomaticService.closeDeliveryPeriods(function() { 
                    done();
                });
            });
        });
        agenda.every('1 minute', 'deliveryProcessorDev');
        agenda.start();
    }, function(err) {
       console.log('Delivery Processor Error'); 
    });    
    
    moment.tz.add(TimeZoneService.timeZones.zones);
    
    math.config({
        number: 'bignumber',
        precision: 64       
    });
    
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};
