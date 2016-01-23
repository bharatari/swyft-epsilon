import Ember from 'ember';

export default Ember.Component.extend({
  typeString() {
    if (this.get('property').type === 'string') {
      return true;
    }
    return false;
  }.property('property'),
  typeDateTime() {
    if (this.get('property').type === 'datetime') {
      return true;
    }
    return false;
  }.property('property'),
  typeNumber() {
    if (this.get('property').type === 'number') {
      return true;
    }
    return false;
  }.property('property'),
  typeEnum() {
    if (this.get('property').type === 'enum') {
      return true;
    }
    return false;
  }.property('property'),
  typeBoolean() {
    if (this.get('property').type === 'boolean') {
      return true;
    }
    return false;
  }.property('property'),
  typeArray() {
    if (this.get('property').type === 'array') {
      return true;
    }
    return false;
  }.property('property'),
  typeObject() {
    if (this.get('property').type === 'object') {
      return true;
    }
    return false;
  }.property('property'),
  booleanValues: [
    { propertyName: true, displayName: 'True' },
    { propertyName: false, displayName: 'False' }
  ],
  adminDiscourage() {
    if (this.get('property').advancedField) {
      return 'form-control admin-discourage';
    }
    return 'form-control';
  }.property('property')
});
