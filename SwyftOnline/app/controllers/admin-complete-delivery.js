import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    deliveryList: function() {
        var array = this.get('deliveries');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
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
                var url = config.routeLocation + "/api/order";
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        alert("Thanks for your order!");
                        localStorage.removeItem('cart');
                        self.transitionToRoute("restaurants");
                    },
                    error: function(xhr, textStatus, error) {
                        alert("Something went wrong there. If you're using Swyft Debit, ensure you have enough balance in your account to proceed. You might also want to try emptying your cart and starting over.");
                        self.set('buttonPressed', false);
                    }
                });
            }
            else {
                alert('You need to select a delivery');
            }
        }
    }
});