var _ = require('lodash'); 

module.exports = {
    forLoop: function(items, process, callback) {
        function loop(i){
            if(i<items.length){
                function query(cb){
                    process(items[i], function() {
                        cb();
                    });
                }
                query(function(){
                    loop(i+1);
                });
            }
            else{
                callback(items);
            }
        }
        loop(0);
    },
    indexOfByProperty: function(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    },
    indexOf: function(myArray, searchTerm) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i] === searchTerm) return i;
        }
        return -1;
    },
    splitCSV: function(csv) {
        return csv.split(", ");
    },
    protect: function (run, onError) {
        var domain = require('domain').create();
        domain.on('error', onError);
        domain.run(run);
    },
    sort: function(array, propertyString) {
        return array.sort(function(a,b) { 
            return new Date(a[propertyString]).getTime() - new Date(b[propertyString]).getTime() 
        });
    },
    pagination: function(data, recordsPerPage, page) {
        var totalPages = Math.ceil(data.length / recordsPerPage);
        var lower = (page - 1) * recordsPerPage;
        var upper = data.length - (page * recordsPerPage);
        data = _.drop(data, lower);
        data = _.dropRight(data, upper);
        return data;
    },
    sortData: function(data, sortProperty, sortType) {
        if(sortType === 'asc') {
            return _.sortByOrder(data, [sortProperty], [true]);
        }
        else if(sortType === 'desc') {
            return _.sortByOrder(data, [sortProperty], [false]);
        }
    },
    filterData: function(data, filters) {
        for(var i = 0; i < filters.length; i++) {
            data = this.filter(data, filters[i].filterProperty, filters[i].filterType, filters[i].filterValue);
        }
        return data;
    },
    filter: function(data, filterProperty, filterType, filterValue) {
        var newData = [];
        if(typeof filterValue === 'string') {
            if(parseFloat(filterValue)) {
                filterValue = parseFloat(filterValue);
            }
            else {
                filterValue = filterValue.toLowerCase();
            }
        }
        if(data) {
            for(var i = 0; i < data.length; i++) {
                if(filterType === "equalTo") {
                    if(typeof this.nestedProperty(data[i], filterProperty) === 'string') {
                        if(this.nestedProperty(data[i], filterProperty).toLowerCase() === filterValue.toLowerCase()) {
                            newData.push(data[i]);
                        }
                    }
                    else {
                        if(this.nestedProperty(data[i], filterProperty) === filterValue) {
                            newData.push(data[i]);
                        }
                    }
                }
                else if(filterType === "notEqualTo") {
                    if(typeof this.nestedProperty(data[i], filterProperty) === 'string') {
                        if(this.nestedProperty(data[i], filterProperty).toLowerCase() !== filterValue.toLowerCase()) {
                            newData.push(data[i]);
                        }
                    }
                    else {
                        if(this.nestedProperty(data[i], filterProperty) !== filterValue) {
                            newData.push(data[i]);
                        }
                    }
                }
                else if(filterType === "lessThan") {
                    if(this.nestedProperty(data[i], filterProperty) < filterValue) {
                        newData.push(data[i]);
                    }
                }
                else if(filterType === "greaterThan") {
                    if(this.nestedProperty(data[i], filterProperty) > filterValue) {
                        newData.push(data[i]);
                    }
                }
            }
        }
        return newData;
    },
    nestedProperty: function(object, property) {
        if(object && property) {
            if(property.indexOf('.') !== -1)
            {
                var array = property.split(".");
                var value = object;
                for(var i = 0; i < array.length; i++) {
                    value = value[array[i]]
                }
                return value;
            }
            else {
                return object[property];
            }
        }
    },
    /** Converts filters to Waterline syntax **/
    convertFilters: function(filters) {
        var filterObject = {};
        for(var i = 0; i < filters.length; i++) {
            if(filters[i].filterType !== 'equalTo') {
                var filterProperty = {};
                filterProperty[this.convertFilterType(filters[i].filterType)] = filters[i].filterValue;
                filterObject[filters[i].filterProperty] = filterProperty;
            }
            else {
                filterObject[filters[i].filterProperty] = filters[i].filterValue;
            }
        }
        return filterObject;
    },
    convertFilterType: function(filterType) {
        var propertyDictionary = new Array();
        propertyDictionary["greaterThan"] = '>';
        propertyDictionary["lessThan"] = '<';
        propertyDictionary["notEqualTo"] = '!';
        return propertyDictionary[filterType];
    }
}