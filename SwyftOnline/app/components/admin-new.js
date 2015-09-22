import Ember from "ember";

export default Ember.Component.extend({ 
    actions: {
        accept: function() {
            this.sendAction('accept');
        },
        cancel: function() {
            this.sendAction('cancel');
        },
        submit: function(type) {
            this.sendAction('submit', type);
        }
    }
});