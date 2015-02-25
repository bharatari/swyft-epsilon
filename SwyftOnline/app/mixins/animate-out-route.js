import Ember from "ember";

export default Ember.Mixin.create({
    actions: {
        willTransition: function(transition) {
            $(".animate-out-body").removeClass('fadeIn').addClass('fadeOut');
        }
    }
});