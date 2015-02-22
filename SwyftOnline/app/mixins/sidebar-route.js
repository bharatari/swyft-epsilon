import Ember from "ember";

export default Ember.Mixin.create({
    setupController: function(controller, model) {
        $(".ember-application").css('overflow', 'auto');
    }
});