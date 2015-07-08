import Ember from "ember";

export default Ember.Component.extend({
    typeString: function() {
        if(this.get('property').type === 'string') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
    typeDate: function() {
        if(this.get('property').type === 'date') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
    typeNumber: function() {
        if(this.get('property').type === 'number') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
    typeEnum: function() {
        if(this.get('property').type === 'enum') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
    typeBoolean: function() {
        if(this.get('property').type === 'boolean') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
    booleanValues: [
        { propertyName: true, displayName: 'True' },
        { propertyName: false, displayName: 'False' }
    ],
    adminDiscourage: function() {
        if(this.get('property').advancedField) {
            return 'form-control admin-discourage';
        }  
        else {
            return 'form-control';
        }
    }.property('property')
});