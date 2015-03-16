import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Controller.extend({ 
    order: function() {
        var data = this.get('model');        
        data.phoneLink = "tel:" + data.contactPhone;
        for(var i = 0; i < data.length; i++) {
            for(var e = 0; e < data[i].items.length; e++){
                var options = "";
                for (var property in data[i].items[e].options) {
                    if (data[i].items[e].options.hasOwnProperty(property)) {
                        options += data[i].items[e].options[property].name + ", ";
                    }
                }
                if(data[i].items[e].standardOptions) {
                    for(var z = 0; z < data[i].items[e].standardOptions.length; z++){
                        if(data[i].items[e].standardOptions[z].isSelected){
                            options += data[i].items[e].standardOptions[z].name + ", ";
                        }
                    }
                }
                if(data[i].items[e].extras) {
                    for(var property in data[i].items[e].extras){
                        if(data[i].items[e].extras.hasOwnProperty(property)){
                            options += data[i].items[e].extras[property].name + ", ";
                        }
                    }
                }
                if(array[i].attachedRequests) {
                    for(var e = 0; e < array[i].attachedRequests.length; e++) {
                        options += array[i].attachedRequests[e].name + ", ";
                    }                   
                }
                options=options.substring(0, options.length-2);
                data[i].items[e].itemOptions=options;
            }
        }
        if(!data.deliveryNote) {
            data.deliveryNote = {
                commentedBy: null,
                deliveredBy: null,
                comments: "",
                isDelivered: false,
                deliveredAt: null
            }   
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