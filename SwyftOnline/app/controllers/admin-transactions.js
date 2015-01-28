import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    transactions: function() {
        var array = this.get('model');
        for(var i = 0; i < array.length; i++) {
            array[i].displayDate = moment(array[i].createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('model')
});