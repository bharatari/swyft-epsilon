import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        order: function() {
            this.transitionToRoute('restaurants');
        }
    }
});