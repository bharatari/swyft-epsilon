import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        goBack: function() {
            this.sendAction('goBack');
        }
    }
});