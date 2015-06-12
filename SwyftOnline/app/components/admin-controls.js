import Ember from "ember";

export default Ember.Component.extend({ 
    actions: {
        goToNew: function() {
            this.sendAction('new');
        }
    }
});