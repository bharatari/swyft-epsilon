import Ember from "ember";

export default Ember.Component.extend({
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
            else {
                newFilter.filterValue = newFilter.filterValue.toLowerCase();
            }
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
                    console.log('adfasdf');
                    filters.splice(i, 1);
                }
            }
            this.set('filters', filters);
        }
    }
});