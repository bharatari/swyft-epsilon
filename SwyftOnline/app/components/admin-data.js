import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit(id) {
      this.sendAction('edit', id);
    },
    delete(id) {
      this.sendAction('delete', id);
    },
  },
});
