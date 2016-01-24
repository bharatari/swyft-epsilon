import Ember from 'ember';

export default Ember.Component.extend({
  typeString: Ember.computed('property', function() {
    if (this.get('property').type === 'string') {
      return true;
    }
    return false;
  }),
  typeDateTime: Ember.computed('property', function () {
    if (this.get('property').type === 'datetime') {
      return true;
    }
    return false;
  }),
  typeNumber: Ember.computed('property', function () {
    if (this.get('property').type === 'number') {
      return true;
    }
    return false;
  }),
  typeEnum: Ember.computed('property', function () {
    if (this.get('property').type === 'enum') {
      return true;
    }
    return false;
  }),
  typeBoolean: Ember.computed('property', function () {
    if (this.get('property').type === 'boolean') {
      return true;
    }
    return false;
  }),
  typeArray: Ember.computed('property', function () {
    if (this.get('property').type === 'array') {
      return true;
    }
    return false;
  }),
  typeObject: Ember.computed('property', function () {
    if (this.get('property').type === 'object') {
      return true;
    }
    return false;
  }),
  booleanValues: [
    { propertyName: true, displayName: 'True' },
    { propertyName: false, displayName: 'False' }
  ],
  adminDiscourage: Ember.computed('property', function () {
    if (this.get('property').advancedField) {
      return 'form-control admin-discourage';
    }
    return 'form-control';
  })
});
