/*var Agenda = require('agenda'); */
var schedule = require('node-schedule');
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
        var deliveryProcessor = schedule.scheduleJob("*/1 * * * *", function() {
            AutomaticService.processDeliveryPeriods(function() {
                AutomaticService.closeDeliveryPeriods(function() { });
            });
        });
        var deliveryProcessor = schedule.scheduleJob("30 18 * * 3", function() {
            console.log("Email Service Running");
            AutomaticService.processOutstandingPayments(function() { });
        });
    }, function(err) {
        console.log('Automatic Service Error: ' + err); 
    });    
    
    math.config({
        number: 'bignumber',
        precision: 64       
    });
    
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};
