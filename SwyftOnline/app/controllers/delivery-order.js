import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import modelUtils from 'swyft-online/utils/model-utils';

export default Ember.Controller.extend({ 
    order: function() {
        var data = this.get('model');        
        data.phoneLink = "tel:" + data.contactPhone;
        for(var e = 0; e < data.items.length; e++) {
            var options = "";
            for (var property in data.items[e].options) {
                if (data.items[e].options.hasOwnProperty(property)) {
                    options += data.items[e].options[property].name + ", ";
                }
            }
            if(data.items[e].standardOptions) {
                for(var z = 0; z < data.items[e].standardOptions.length; z++){
                    if(data.items[e].standardOptions[z].isSelected){
                        options += data.items[e].standardOptions[z].name + ", ";
                    }
                }
            }
            if(data.items[e].extras) {
                for(var property in data.items[e].extras){
                    if(data.items[e].extras.hasOwnProperty(property)){
                        options += data.items[e].extras[property].name + ", ";
                    }
                }
            }
            if(data.items[e].attachedRequests) {
                for(var i = 0; i < data.items[e].attachedRequests.length; i++) {
                    options += data.items[e].attachedRequests[i].name + ", ";
                }                   
            }
            options = options.substring(0, options.length - 2);
            data.items[e].itemOptions = options;
        }
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