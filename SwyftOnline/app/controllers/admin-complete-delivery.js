import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';
import constants from 'swyft-online/utils/constants-utils';

export default Ember.Controller.extend({
    deliveryList: function() {
        moment.tz.add(constants.timeZones.zones);
        var array = this.get('deliveries');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('deliveries'),
    actions: {
        submit: function() {
            if(this.get('deliveryList').value) {
                var data={
                    deliveryId: this.get('deliveryList').value,
                    _csrf:this.get('csrfToken')._csrf,
                    user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
                };
                var url = config.routeLocation + "/api/delivery/complete";
                Ember.$.ajax({
                    url: url,
                    headers: { 
                        Accept : "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify(data),
                    type: "POST",
                    success: function(response) {
                        alert("Success");
                    },
                    error: function(xhr, textStatus, error) {
                        alert("Error");
                    }
                });
            }
            else {
                alert('You need to select a delivery');
            }
        }
    }
});