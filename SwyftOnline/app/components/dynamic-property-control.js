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
    typeDateTime: function() {
        if(this.get('property').type === 'datetime') {
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
    typeArray: function() {
        if(this.get('property').type === 'array') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
    typeObject: function() {
        if(this.get('property').type === 'object') {
            return true;
        }
        else {
            return false;
        }
    }.property('property'),
});