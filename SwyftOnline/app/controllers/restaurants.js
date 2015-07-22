import Ember from "ember";
import StandardActionsMixin from 'swyft-epsilon-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, {
    searchValue: "",
    filteredRestaurants: function() {
        var value = this.get("searchValue");
        var restaurants = this.get('restaurants');
        return restaurants.filter(function(restaurant) {
            return restaurant.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }.property('restaurants', 'searchValue'),
    actions: {
        transition: function(restaurant) {
            this.transitionToRoute('menu-items', restaurant);
        }
    }
});