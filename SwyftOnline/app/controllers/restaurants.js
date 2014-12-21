import Ember from "ember";

export default Ember.Controller.extend({
    restaurants: function(){
        return this.get('model');
    }.property('model'),
    actions: {
        toggleSidebar: function(){
            $('#nav-menu').offcanvas('toggle');
        }
    }
});