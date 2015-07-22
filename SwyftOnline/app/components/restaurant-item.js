import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Component.extend({
    imageUrl: Ember.computed('restaurant', function() {
       var restaurant = this.get('restaurant');
       if(restaurant) {
           if(config.environment === 'production') {
               return '/SwyftOnline/' + restaurant.image;
           }
           else {
               return restaurant.image;
           }
       }        
    }),
    actions: {
        transition: function(name) {
            this.sendAction('transition', name);   
        }            
    }
});