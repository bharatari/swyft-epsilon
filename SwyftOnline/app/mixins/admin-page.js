import Ember from "ember";

export default Ember.Mixin.create({
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
        if(Object.getOwnPropertyNames(filterObject).length === 0) {
            return;
        }
        return filterObject;
    },
    convertFilterType: function(filterType) {
        var propertyDictionary = new Array();
        propertyDictionary["greaterThan"] = '>';
        propertyDictionary["lessThan"] = '<';
        propertyDictionary["notEqualTo"] = '!';
        return propertyDictionary[filterType];
    },
});