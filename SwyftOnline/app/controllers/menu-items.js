import Ember from "ember";
import StandardActionsMixin from 'swyft-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, {
    filtered: Ember.computed.filter('menuItems', function(menuItem){
        var regex = new RegExp(this.get('search'), 'i');
        return menuItem.name.match(regex);
    }).property('menuItems', 'search'),
    actions:{
        transition: function(itemId) {
            this.transitionToRoute('item', itemId);
        }
    }
});