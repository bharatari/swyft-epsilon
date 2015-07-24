import Ember from "ember";

export default Ember.Component.extend({
    filters: [],
    filterTypes: [
        { propertyName: 'equalTo', displayName: "Equal" },
        { propertyName: 'notEqualTo', displayName: "Not Equal" },
        { propertyName: 'lessThan', displayName: "Less Than" },
        { propertyName: 'greaterThan', displayName: "Greater Than" }
    ],
    filtersEqual: function(filter1, filter2) {
        if((filter1.filterProperty === filter2.filterProperty) && (filter1.filterType === filter2.filterType) && (filter1.filterValue === filter2.filterValue)) {
            return true;
        }
        else {
            return false;
        }
    },
    processValuePath: function(path) {
        var values = path.split(".");
        return values[1];
    },
    getType: function(property) {
        var properties = this.get('properties');
        for(var i = 0; i < properties.length; i++) {
            if(properties[i]['propertyName'] === property) {
                return properties[i]['type'];
            }
        }  
    },
    objectProperties: Ember.computed.oneWay('properties'),
    actions: {
        add: function() {
            var filters = _.clone(this.get('filters'), true);
            var newFilter = {
                filterProperty: this.get('filterProperty'),
                filterType: this.get('filterType'),
                filterValue: this.get('filterValue')
            };
            if(parseFloat(newFilter.filterValue)) {
                newFilter.filterValue = parseFloat(newFilter.filterValue);
            }
            else if (this.get(newFilter.filterProperty) === 'boolean') {
                if(newFilter.filterValue === 'true' || newFilter.filterValue === 'True') {
                    newFilter.filterValue = true;
                }
                else if (newFilter.filterValue === 'false' || newFilter.filterValue === 'False') {
                    newFilter.filterValue = false;
                }
            }
            /*
            else {
                newFilter.filterValue = newFilter.filterValue.toLowerCase();
            }
            */
            filters.push(newFilter);
            this.set('filters', filters);
        },
        reset: function() {
            this.set('filters', []);
        },
        remove: function(filter) {
            var filters = _.clone(this.get('filters'), true);
            for(var i = 0; i < filters.length; i++) {
                if(this.filtersEqual(filter, filters[i])) {
                    filters.splice(i, 1);
                }
            }
            this.set('filters', filters);
        }
    }
});