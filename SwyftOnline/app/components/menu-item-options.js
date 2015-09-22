/* global _ */
/* jslint unused: false */
/* jslint eqeqeq: true */
import Ember from "ember";

export default Ember.Component.extend({
    booleanValues: [
        { propertyName: true, displayName: 'True' },
        { propertyName: false, displayName: 'False' }
    ],
    standardOption: Ember.computed('itemOption', function() {
        var itemOption = this.get('itemOption');
        if(itemOption.name === "Options") {
            return true;
        }
        else {
            return false;
        }
    }),
    actions: {
        deleteOption(option) {
            var itemOption = this.get('itemOption');
            var options = itemOption.options;
            Ember.set(itemOption, 'options', _.remove(this.get('itemOption').options, function(n) {
                //return !_.isEqual(option, n);
                return option != n;
            }));
        },
        addOption() {
            var itemOption = this.get('itemOption');
            var options = _.clone(itemOption.options, true);
            options.push({
                name: "",
                price: null
            });
            Ember.set(itemOption, 'options', options);
            //this.rerender();
        },
        deleteItemOption() {
            this.sendAction('deleteItemOption', this.get('itemOption'));
        }
    }
});