import Ember from "ember";

export default Ember.Component.extend({ 
    tagName: 'li',
    classNames: ['admin-sidebar-item'],
    classNameBindings: ['activeRoute:active'],
    attributeBindings: ['role'],
    role: "presentation",
    activeRoute: function() {
        if(this.get('currentRoute') === this.get('route')) {
            return true;
        }
        else {
            return false;
        }
    }.property('currentRoute', 'route')
});