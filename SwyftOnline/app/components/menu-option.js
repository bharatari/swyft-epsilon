import Ember from "ember";

export default Ember.Component.extend({
    booleanValues: [
        { propertyName: true, displayName: 'True' },
        { propertyName: false, displayName: 'False' }
    ],
    actions: {
        remove() {
            this.sendAction('deleteOption', this.get('option'));
        }
    }
});