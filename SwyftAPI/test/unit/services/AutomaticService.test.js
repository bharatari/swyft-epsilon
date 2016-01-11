var assert = require('chai').assert;
var expect = require('chai').expect;
var AutomaticService = require('../../../api/services/AutomaticService');
var moment = require('moment');

describe('AutomaticService', function() {
    describe('#deliveryInRange()', function() {
        it('should return false for out of range delivery period', function() {
            var period = {
                "deliveryDay" : "Wednesday",
                "deliveryHour" : 23,
                "deliveryMinute" : 30,
                "deliverySecond" : 0,
                "cutoffDay" : "Wednesday",
                "cutoffHour" : 22,
                "cutoffMinute" : 15,
                "cutoffSecond" : 0,
                "arrivalDay" : "Wednesday",
                "arrivalHour" : 23,
                "arrivalMinute" : 15,
                "arrivalSecond" : 0,
                "openDay" : "Tuesday",
                "openHour" : 23,
                "openMinute" : 30,
                "openSecond" : 0,
                "restaurants" : "All",
                "deliverers" : "Spencer Burleigh",
                "enabled" : false
            };
            var today = moment().day("Monday").set({ hour: 10, minute: 10, second: 10 });
            var inRange = AutomaticService.deliveryInRange(period, today);
            assert.isFalse(inRange);
        });
        it('should return true for in range delivery period', function() {
            var period = {
                "deliveryDay" : "Wednesday",
                "deliveryHour" : 23,
                "deliveryMinute" : 30,
                "deliverySecond" : 0,
                "cutoffDay" : "Wednesday",
                "cutoffHour" : 22,
                "cutoffMinute" : 15,
                "cutoffSecond" : 0,
                "arrivalDay" : "Wednesday",
                "arrivalHour" : 23,
                "arrivalMinute" : 15,
                "arrivalSecond" : 0,
                "openDay" : "Tuesday",
                "openHour" : 23,
                "openMinute" : 30,
                "openSecond" : 0,
                "restaurants" : "All",
                "deliverers" : "Spencer Burleigh",
                "enabled" : false
            };
            var today = moment().day("Tuesday").set({ hour: 23, minute: 31, second: 10 });
            if(TimeZoneService.isDST()) {
                today.add(1, 'hours');
            }
            var inRange = AutomaticService.deliveryInRange(period, today);
            assert.isTrue(inRange);
        });
    });
    describe('#processMoment()', function() {
        it('should create a valid moment', function() {
            var date = AutomaticService.processMoment("Monday", 10, 10, 10);
            assert.isTrue(moment.isMoment(date));
        });
        it('should create a valid moment with correct date', function() {
            var date = AutomaticService.processMoment("Monday", 10, 10, 10);
            var test = moment().day("Monday").set({ hour: 10, minute: 10, second: 10 });
            if(TimeZoneService.isDST()) {
                test.add(1, 'hours');
            }
            assert.isTrue(date.isSame(test));
        });
        it('should add seven days if day is Sunday', function() {
            var date = AutomaticService.processMoment("Sunday", 10, 10, 10);
            var test = moment().day("Sunday").set({ hour: 10, minute: 10, second: 10 });
            if(TimeZoneService.isDST()) {
                test.add(1, 'hours');
            }
            test.add(7, 'days');
            assert.isTrue(date.isSame(test));
        });
        it('should return a date if params are undefined or null', function() {
            var date = AutomaticService.processMoment("Monday", 10);
            assert.isTrue(!moment.isMoment(date) && date instanceof Date);
        });
    });
});

