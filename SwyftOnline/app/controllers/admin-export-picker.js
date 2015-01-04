import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    deliveryList: function() {
        var array = this.get('model');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('model'),
});