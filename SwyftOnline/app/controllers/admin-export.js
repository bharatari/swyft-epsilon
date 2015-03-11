import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';

export default Ember.Controller.extend({
    deliveryItems: function() {
        var data = this.get('model');   
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
        return data;
    }.property('model')
});