import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        accept: function() {
            this.sendAction('accept');
        },
        cancel: function() {
            this.sendAction('cancel');
        },
        new: function() {
            this.sendAction('new');
        },
        edit: function(id) {
            this.sendAction('edit', id);
        },
        delete: function(id) {
            this.sendAction('delete', id);
        }
    }
});