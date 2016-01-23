import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    goToNew() {
      this.sendAction('new');
    },
  },
});
