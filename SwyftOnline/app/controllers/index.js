import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        order: function() {
            this.transitionToRoute('restaurants');
        },
        signUp: function() {
            this.transitionToRoute('sign-up');
        },
        learnMore: function() {
            this.transitionToRoute('learn-more');
        },
        terms: function() {
            
        }
    }
});