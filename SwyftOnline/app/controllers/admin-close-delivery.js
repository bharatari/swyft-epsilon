import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    deliveryList: function() {
        var array = this.get('deliveries');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('deliveries'),
    actions: {
        submit: function() {
            if(this.get('deliveryList').value) {
                var data= { 
                    id: this.get('deliveryList').value,
                    user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
                };
                var url = config.routeLocation + "/api/delivery/close";
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