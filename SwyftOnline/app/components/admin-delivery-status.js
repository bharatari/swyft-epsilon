import Ember from 'ember';

export default Ember.Component.extend({
  errorStatus: Ember.computed('status', function () {
    if (this.get('status') === 'irrops' || this.get('status') === 'delayed') {
      return true;
    } else {
      return false;
    }
  }),
  textStatus: Ember.computed('status', function () {
    if (this.get('status') === 'onTime') {
      return 'On-Time'
    } else if (this.get('status') === 'delayed') {
      return 'Delayed';
    } else if (this.get('status') === 'scheduled') {
      return 'Scheduled';
    } else if (this.get('status') === 'irrops') {
      return 'Irregular Operations';
    } else {
      return 'No Delivery';
    }
  })
});
