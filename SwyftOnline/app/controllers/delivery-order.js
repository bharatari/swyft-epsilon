import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';
import itemUtils from 'swyft-epsilon-online/utils/item-utils';

export default Ember.Controller.extend({ 
    order: function() {
        var data = this.get('model');        
        data.phoneLink = "tel:" + data.contactPhone;
        data.items = itemUtils.processItems(data.items); 
        if(!data.deliveryNote) {
            data.deliveryNote = new modelUtils.DeliveryNote();
        }
        return data;
    }.property('model'),
    actions: {
        submitComments: function() {
            var data = {
                orderId: this.get('order').id,
                comments: this.get('order').deliveryNote.comments,
                user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            }
            var url = config.routeLocation + "/api/deliveryNote/comment";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    alert("Comment changed.");
                },
                error: function(xhr, textStatus, error) {
                    alert("Error");
                }
            });
        },
        submitDelivered: function() {
            var data = {
                orderId: this.get('order').id,
                isDelivered: true,
                user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            }
            var url = config.routeLocation + "/api/deliveryNote/delivered";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    alert("Status changed.");
                },
                error: function(xhr, textStatus, error) {
                    alert("Error");
                }
            });
        },
        submitNotDelivered: function() {
            var data = {
                orderId: this.get('order').id,
                isDelivered: false,
                user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            }
            var url = config.routeLocation + "/api/deliveryNote/delivered";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    alert("Status changed.");
                },
                error: function(xhr, textStatus, error) {
                    alert("Error");
                }
            });
        }    
    }
});