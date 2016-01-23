import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    accept() {
      this.sendAction('accept');
    },
    cancel() {
      this.sendAction('cancel');
    },
    new() {
      this.sendAction('new');
    },
    edit(id) {
      this.sendAction('edit', id);
    },
    delete(id) {
      this.sendAction('delete', id);
    },
  },
});
