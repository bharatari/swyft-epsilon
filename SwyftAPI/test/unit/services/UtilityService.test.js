var assert = require('chai').assert;
var expect = require('chai').expect;
var UtilityService = require('../../../api/services/UtilityService');

describe.only('UtilityService', function() {
    describe('#splitCSV()', function() {
        it('should split a comma and space separated string into an array', function(done) {
            var CSV = "admin, delivery, employee";
            var array = UtilityService.splitCSV(CSV);
            var expected = [
                'admin',
                'delivery',
                'employee'
            ];
            assert.deepEqual(array, expected);
            done();
        });
        it('should return an empty array for empty strings', function(done) {
            var CSV = "";
            var array = UtilityService.splitCSV(CSV);
            var expected = [];
            assert.deepEqual(array, expected);
            done();
        });
        it('should return an array with a single element for single element strings', function(done) {
            var CSV = "admin";
            var array = UtilityService.splitCSV(CSV);
            var expected = ['admin'];
            assert.deepEqual(array, expected);
            done();
        });
    });
    describe('#CSVContains()', function() {
        it('should return true if CSV contains string', function(done) {
            var CSV = "admin, delivery, employee";
            var result = UtilityService.CSVContains(CSV, "admin");
            var expected = true;
            assert.equal(result, expected);
            done();
        });
        it('should return false if CSV does not contain string', function(done) {
            var CSV = "delivery, employee";
            var result = UtilityService.CSVContains(CSV, "admin");
            var expected = false;
            assert.equal(result, expected);
            done();
        });
        it('should return false if CSV is empty', function(done) {
            var CSV = "";
            var result = UtilityService.CSVContains(CSV, "admin");
            var expected = false;
            assert.equal(result, expected);
            done();
        });
        it('should return true if CSV contains string and only that string', function(done) {
            var CSV = "admin";
            var result = UtilityService.CSVContains(CSV, "admin");
            var expected = true;
            assert.equal(result, expected);
            done();
        });
    });
    describe('#paginationSkip()', function() {
        it('should return data without skip', function(done) {
            var data = [
                'hello',
                'my',
                'name',
                'is',
                'swyft',
                'epsilon'
            ];
            var result = UtilityService.paginationSkip(data, 5, 0);
            var expected = [
                'hello',
                'my',
                'name',
                'is',
                'swyft'
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data with skip', function(done) {
            var data = [
                'hello',
                'my',
                'name',
                'is',
                'swyft',
                'epsilon'
            ];
            var result = UtilityService.paginationSkip(data, 5, 1);
            var expected = [
                'my',
                'name',
                'is',
                'swyft',
                'epsilon'
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return empty array if array is empty', function(done) {
            var data = [];
            var result = UtilityService.paginationSkip(data, 5, 1);
            var expected = [];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data if data length is smaller than page', function(done) {
            var data = [
                'hello',
                'my',
                'name'
            ];
            var result = UtilityService.paginationSkip(data, 5, 0);
            var expected = [
                'hello',
                'my',
                'name'
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data if data length is smaller than page and there is a skip', function(done) {
            var data = [
                'hello',
                'my',
                'name'
            ];
            var result = UtilityService.paginationSkip(data, 5, 1);
            var expected = [
                'my',
                'name'
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data if page exceeds provided data array', function(done) {
            var data = [
                'hello',
                'my',
                'name'
            ];
            var result = UtilityService.paginationSkip(data, 5, 10);
            var expected = [];
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#sortData()', function() {
        it('should sort data in ascending order', function(done) {
            var data = [
                { name: 'b' },
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            var result = UtilityService.sortData(data, 'name', 'ASC');
            var expected = [
                { name: 'a' },                                
                { name: 'b' },
                { name: 'c' },
                { name: 'd' },
                { name: 'e' },
                { name: 'f' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should sort data in descending order', function(done) {
            var data = [
                { name: 'b' },
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            var result = UtilityService.sortData(data, 'name', 'DESC');
            var expected = [
                { name: 'f' },                                
                { name: 'e' },
                { name: 'd' },
                { name: 'c' },
                { name: 'b' },
                { name: 'a' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data if not supported with empty sort property provided', function(done) {
            var data = [
                'a',
                'c',
                'b'
            ];
            var result = UtilityService.sortData(data, '', 'ASC');
            var expected = [
                'a',
                'c',
                'b'
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data if not supported with sort property provided', function(done) {
            var data = [
                'a',
                'c',
                'b'
            ];
            var result = UtilityService.sortData(data, 'alphabet', 'ASC');
            var expected = [
                'a',
                'c',
                'b'
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return data if sort property not provided', function(done) {
            var data = [
                { name: 'b' },
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            var result = UtilityService.sortData(data, '', 'ASC');
            var expected = [
                { name: 'b' },
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#filterData()', function() {
        it('should filter data with one filter', function(done) {
            var data = [
                { name: 'ba' },
                { name: 'aw' },
                { name: 'awe' },
                { name: 'dw' },
                { name: 'ce' },
                { name: 'fw' },
                { name: 'ef' }
            ];
            var result = UtilityService.filterData(data, [
                { filterProperty: 'name', filterType: 'contains', filterValue: 'w' }
            ]);
            var expected = [
                { name: 'aw' },
                { name: 'awe' },
                { name: 'dw' },
                { name: 'fw' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should filter data with two filters', function(done) {
            var data = [
                { name: 'ba' },
                { name: 'aw' },
                { name: 'awe' },
                { name: 'dw' },
                { name: 'ce' },
                { name: 'fw' },
                { name: 'ef' }
            ];
            var result = UtilityService.filterData(data, [
                { filterProperty: 'name', filterType: 'contains', filterValue: 'w' },
                { filterProperty: 'name', filterType: 'contains', filterValue: 'a' }
            ]);
            var expected = [
                { name: 'aw' },
                { name: 'awe' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should filter data with three filters', function(done) {
            var data = [
                { name: 'ba' },
                { name: 'aw' },
                { name: 'awe' },
                { name: 'dw' },
                { name: 'ce' },
                { name: 'fw' },
                { name: 'ef' }
            ];
            var result = UtilityService.filterData(data, [
                { filterProperty: 'name', filterType: 'contains', filterValue: 'w' },
                { filterProperty: 'name', filterType: 'contains', filterValue: 'a' },
                { filterProperty: 'name', filterType: 'contains', filterValue: 'e' }
            ]);
            var expected = [
                { name: 'awe' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#filter()', function() {
        it('should filter data with an equalTo filter', function(done) {
            var data = [
                { name: 'b' },
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            var result = UtilityService.filter(data, 'name', 'equalTo', 'b');
            var expected = [
                { name: 'b' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should filter data with a notEqualTo filter', function(done) {
            var data = [
                { name: 'b' },
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            var result = UtilityService.filter(data, 'name', 'notEqualTo', 'b');
            var expected = [
                { name: 'a' },
                { name: 'd' },
                { name: 'c' },
                { name: 'f' },
                { name: 'e' }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should filter data with a lessThan filter', function(done) {
            var data = [
                { price: 13 },
                { price: 12 },
                { price: 13 },
                { price: 11 },
                { price: 14 },
                { price: 10 }
            ];
            var result = UtilityService.filter(data, 'price', 'lessThan', 14);
            var expected = [
                { price: 13 },
                { price: 12 },
                { price: 13 },
                { price: 11 },
                { price: 10 }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should filter data with a greaterThan filter', function(done) {
            var data = [
                { price: 13 },
                { price: 12 },
                { price: 13 },
                { price: 11 },
                { price: 14 },
                { price: 10 }
            ];
            var result = UtilityService.filter(data, 'price', 'greaterThan', 10);
            var expected = [
                { price: 13 },
                { price: 12 },
                { price: 13 },
                { price: 11 },
                { price: 14 }
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should filter data with a contains filter', function(done) {
            var data = [
                { name: 'ba' },
                { name: 'aw' },
                { name: 'dw' },
                { name: 'ce' },
                { name: 'fw' },
                { name: 'ef' }
            ];
            var result = UtilityService.filter(data, 'name', 'contains', 'w');
            var expected = [
                { name: 'aw' },
                { name: 'dw' },
                { name: 'fw' },
            ];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return empty array for mismatched property and filter type, string and number', function(done) {
            var data = [
                { name: 'ba' },
                { name: 'aw' },
                { name: 'dw' },
                { name: 'ce' },
                { name: 'fw' },
                { name: 'ef' }
            ];
            var result = UtilityService.filter(data, 'name', 'contains', 2);
            var expected = [];
            assert.deepEqual(result, expected);
            done();
        });
        it('should return empty array for mismatched property and filter type, number and string', function(done) {
            var data = [
                { price: 13 },
                { price: 12 },
                { price: 13 },
                { price: 11 },
                { price: 14 },
                { price: 10 }
            ];
            var result = UtilityService.filter(data, 'name', 'contains', 'a');
            var expected = [];
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#nestedProperty()', function() {
        it('should return property one level deep', function(done) {
            var object = {
                user: {
                    name: {
                        first: "Swyft",
                        last: "Epsilon"
                    }
                }
            };
            var result = UtilityService.nestedProperty(object, 'user');
            var expected = {
                name: {
                    first: "Swyft",
                    last: "Epsilon"
                }
            };
            assert.deepEqual(result, expected);
            done();
        });
        it('should return property two levels deep', function(done) {
            var object = {
                user: {
                    name: {
                        first: "Swyft",
                        last: "Epsilon"
                    }
                }
            };
            var result = UtilityService.nestedProperty(object, 'user.name');
            var expected = {
                first: "Swyft",
                last: "Epsilon"
            };
            assert.deepEqual(result, expected);
            done();
        });
        it('should return property three levels deep', function(done) {
            var object = {
                user: {
                    name: {
                        first: "Swyft",
                        last: "Epsilon"
                    }
                }
            };
            var result = UtilityService.nestedProperty(object, 'user.name.first');
            var expected = "Swyft";
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#convertFilters', function() {
        it('should convert from epsilon filter array to waterline criteria object', function(done) {
            var epsilon = [ { filterType: 'equalTo',
                               filterValue: 'bharat',
                               filterProperty: 'user.firstName' },
                             { filterType: 'notEqualTo',
                              filterValue: 'deposit',
                              filterProperty: 'type' },
                             { filterType: 'lessThan',
                              filterValue: 10,
                              filterProperty: 'amount' },
                             { filterType: 'greaterThan',
                              filterValue: 20,
                              filterProperty: 'finalBalance' },
                             { filterType: 'contains',
                              filterValue: 'admin',
                              filterProperty: 'roles' } ];
            var waterline = UtilityService.convertFilters(epsilon);
            var expected = {"user.firstName":"bharat","type":{"!":"deposit"},"amount":{"<":10},"finalBalance":{">":20},"roles":{"contains":"admin"}};            
            assert.deepEqual(waterline, expected);
            done();
        });
        it('should return empty object for empty array', function(done) {
            var epsilon = [];
            var waterline = UtilityService.convertFilters(epsilon);
            var expected = {};
            assert.deepEqual(waterline, expected);
            done();
        });
        it('should return empty object for invalid input', function(done) {
            var epsilon = "invalid";
            var waterline = UtilityService.convertFilters(epsilon);
            var expected = {};
            assert.deepEqual(waterline, expected);
            done();
        });
    });
    describe('#convertFilterType()', function() {
        it('should return > for greaterThan', function(done) {
            var result = UtilityService.convertFilterType('greaterThan');
            var expected = '>'
            assert.deepEqual(result, expected);
            done();
        });
        it('should return < for lessThan', function(done) {
            var result = UtilityService.convertFilterType('lessThan');
            var expected = '<'
            assert.deepEqual(result, expected);
            done();
        });
        it('should return ! for notEqualTo', function(done) {
            var result = UtilityService.convertFilterType('notEqualTo');
            var expected = '!'
            assert.deepEqual(result, expected);
            done();
        });
        it('should return contains for contains', function(done) {
            var result = UtilityService.convertFilterType('contains');
            var expected = 'contains'
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#convertFilterFromWaterline()', function() {
        it('should convert from waterline criteria object to epsilon filter array', function(done) {
            var waterline = {"user.firstName":"bharat","type":{"!":"deposit"},"amount":{"<":10},"finalBalance":{">":20},"roles":{"contains":"admin"}};
            var firefly = UtilityService.convertFilterFromWaterline(waterline);
            var expected = [ { filterType: 'equalTo',
                              filterValue: 'bharat',
                              filterProperty: 'user.firstName' },
                            { filterType: 'notEqualTo',
                             filterValue: 'deposit',
                             filterProperty: 'type' },
                            { filterType: 'lessThan',
                             filterValue: 10,
                             filterProperty: 'amount' },
                            { filterType: 'greaterThan',
                             filterValue: 20,
                             filterProperty: 'finalBalance' },
                            { filterType: 'contains',
                             filterValue: 'admin',
                             filterProperty: 'roles' } ];
            assert.deepEqual(firefly, expected);
            done();
        });
        it('should convert from waterline criteria object JSON string to epsilon filter array', function(done) {
            var waterline = {"user.firstName":"bharat","type":{"!":"deposit"},"amount":{"<":10},"finalBalance":{">":20},"roles":{"contains":"admin"}};
            var firefly = UtilityService.convertFilterFromWaterline(JSON.stringify(waterline));
            var expected = [ { filterType: 'equalTo',
                              filterValue: 'bharat',
                              filterProperty: 'user.firstName' },
                            { filterType: 'notEqualTo',
                             filterValue: 'deposit',
                             filterProperty: 'type' },
                            { filterType: 'lessThan',
                             filterValue: 10,
                             filterProperty: 'amount' },
                            { filterType: 'greaterThan',
                             filterValue: 20,
                             filterProperty: 'finalBalance' },
                            { filterType: 'contains',
                             filterValue: 'admin',
                             filterProperty: 'roles' } ];
            assert.deepEqual(firefly, expected);
            done();
        });
        it('should return empty array for invalid JSON string', function(done) {
            var waterline = "23%1040120qmiwd{{}]]2";
            var firefly = UtilityService.convertFilterFromWaterline(waterline);
            var expected = [];
            assert.deepEqual(firefly, expected);
            done();
        });
        it('should return empty array for invalid object', function(done) {
            var waterline = "invalid";
            var firefly = UtilityService.convertFilterFromWaterline(waterline);
            var expected = [];
            assert.deepEqual(firefly, expected);
            done();
        });
    });
    describe('#getPropertyValue()', function() {
        it('should return property one level deep', function(done) {
            var object = {
                user: {
                    name: {
                        first: "Swyft",
                        last: "Epsilon"
                    }
                }
            };
            var result = UtilityService.getPropertyValue(object, 'user');
            var expected = {
                name: {
                    first: "Swyft",
                    last: "Epsilon"
                }
            };
            assert.deepEqual(result, expected);
            done();
        });
    });
    describe('#splitSortAttrs()', function() {
        it('should split sort and sortType into object', function(done) {
            var sort = "createdAt DESC"
            var result = UtilityService.splitSortAttrs(sort);
            var expected = {
                sort: 'createdAt',
                sortType: 'DESC'
            };
            assert.deepEqual(result, expected);
            done();
        });
    });
});

