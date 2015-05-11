import Ember from "ember";

export default Ember.Component.extend({
    filterTypes: [
        'equalTo',
        'notEqualTo',
        'lessThan',
        'greaterThan'
    ],
    actions: {
        add: function() {
            var filters = _.clone(this.get('filters'), true);
            var newFilter = {
                filterProperty: this.get('filterProperty'),
                filterType: this.get('filterType'),
                filterValue: this.get('filterValue')
            };
            filters.push(newFilter);
            this.set('filters', filters);
        },
        reset: function() {
            this.set('filters', []);
        },
        remove: function(filter) {
            var filters = _.clone(this.get('filters'), true);
            for(var i = 0; i < filters.length; i++) {
                if(filter === filters[i]) {
                    filters.splice(i, 1);
                }
            }
            this.set('filters', filters);
        }
    }
});