/* global $ */
import Ember from "ember";

export default Ember.Component.extend({ 
    actions: {
        toggle: function() {
            $('#nav-menu').offcanvas('toggle');
        }
    }
});