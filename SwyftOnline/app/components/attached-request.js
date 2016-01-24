/* jslint unused: false */
import Ember from 'ember';
import itemUtils from 'swyft-epsilon-online/utils/item-utils';

export default Ember.Component.extend({
  displayChange: Ember.observer('item.itemOptions.@each.value', function () {
    this.set('display', itemUtils.checkAttachedProperty(this.get('request'), this.get('item')));
  }),
  display: false,
});
