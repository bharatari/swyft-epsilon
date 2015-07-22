import Ember from "ember";
import itemUtils from 'swyft-epsilon-online/utils/item-utils';

var observer = Ember.observer;
var get = Ember.get;

export default Ember.Component.extend({ 
    displayChange: observer('item.itemOptions.@each.value', function(sender, key, value, rev) {
        this.set('display', itemUtils.checkAttachedProperty(this.get('request'), this.get('item')));
    }),
    display: false
});