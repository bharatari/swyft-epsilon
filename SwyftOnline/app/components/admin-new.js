import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    accept() {
      this.sendAction('accept');
    },
    cancel() {
      this.sendAction('cancel');
    },
    submit(type) {
      this.sendAction('submit', type);
    },
  },
});
