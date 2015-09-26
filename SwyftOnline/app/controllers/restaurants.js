import Ember from "ember";
import StandardActionsMixin from 'swyft-epsilon-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, {
    searchValue: "",
    searchVisible: false,
    /*** @note - Even if searchVisible is false, we can't assume the searchValue is not editable. We stil need to check for all cases. */
    filteredRestaurants: function() {
        var restaurants = this.get('restaurants');
        var value = this.get('searchValue');
        if(this.get('searchVisible') === true) {
            return restaurants.filter(function(restaurant) {
                return restaurant.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            });
        }
        else {
            return restaurants;
        }
    }.property('restaurants', 'searchValue'),
    actions: {
        transition: function(restaurant) {
            this.transitionToRoute('menu-items', restaurant);
        }
    }
});