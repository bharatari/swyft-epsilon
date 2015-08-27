import Ember from "ember";

export default Ember.Component.extend({
    booleanValues: [
        { propertyName: true, displayName: 'True' },
        { propertyName: false, displayName: 'False' }
    ],
    actions: {
        deleteExtra() {
            this.sendAction('deleteExtra', this.get('extra'));
        }
    }
});