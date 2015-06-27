import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        transition: function(name) {
            this.sendAction('transition', name);   
        }            
    }
});