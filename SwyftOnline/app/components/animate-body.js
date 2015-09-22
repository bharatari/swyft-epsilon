/* global $ */
import Ember from "ember";

export default Ember.Component.extend({
    animate: function() {
        var delay = this.get('animateDelay');
        if(delay) {
            setTimeout(function() {
                $(".animate-in-body").removeClass('invisible').addClass('fadeIn');
            }, delay);
        }
        else {
            setTimeout(function() {
                $(".animate-in-body").removeClass('invisible').addClass('fadeIn');
            }, 500);
        }
    }.on('didInsertElement')
});