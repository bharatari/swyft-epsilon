import Ember from "ember";

export default Ember.Controller.extend({
    menuItems: function(){
        return this.get('model');
    }.property('model'),
    actions: {
        toggleSidebar: function(){
            $('#nav-menu').offcanvas('toggle');
        }
    }
});