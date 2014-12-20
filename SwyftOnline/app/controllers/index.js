import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        toggleSidebar: function(){
            Ember.$('#nav-menu').offcanvas('toggle');
        }
    }
});