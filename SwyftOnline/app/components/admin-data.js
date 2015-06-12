import Ember from "ember";

export default Ember.Component.extend({ 
    actions: {
        edit: function(id) {
            this.sendAction('edit', id);
        },
        delete: function(id) {
            this.sendAction('delete', id);
        }
    }
});