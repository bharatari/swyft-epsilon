import Ember from "ember";

export default Ember.Component.extend({ 
    actions: {
        toggle: function() {
            $('#admin-menu').offcanvas('toggle');
        }
    }
});