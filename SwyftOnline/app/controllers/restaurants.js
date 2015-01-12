import Ember from "ember";
import StandardActionsMixin from 'swyft-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, {
    actions: {
        transition: function(restaurant) {
            this.transitionToRoute('menu-items', restaurant);
        }
    }
});