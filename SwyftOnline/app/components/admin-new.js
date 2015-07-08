import Ember from "ember";

export default Ember.Component.extend({ 
    actions: {
        accept: function(id) {
            this.sendAction('accept');
        },
        cancel: function(id) {
            this.sendAction('cancel');
        },
        submit: function(type) {
            this.sendAction('submit', type);
        }
    }
});