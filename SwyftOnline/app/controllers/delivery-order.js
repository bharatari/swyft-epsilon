import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({ 
    order: function() {
        var data = this.get('model');        
        data.phoneLink = "tel:" + data.contactPhone;
        for(var e = 0; e < data.items.length; e++){
            var options="";
            for (var property in data.items[e].options) {
                if (data.items[e].options.hasOwnProperty(property)) {
                    options += data.items[e].options[property].name +", ";
                }
            }
            if(data.items[e].standardOptions) {
                for(var z = 0; z < data.items[e].standardOptions.length; z++){
                    if(data.items[e].standardOptions[z].isSelected){
                        options += data.items[e].standardOptions[z].name +", ";
                    }
                }
            }
            if(data.items[e].extras) {
                for(var property in data.items[e].extras){
                    if(data.items[e].extras.hasOwnProperty(property)){
                        options += data.items[e].extras[property].name +", ";
                    }
                }
            }
            options=options.substring(0, options.length-2);
            data.items[e].itemOptions=options;
        }
        return data;
    }.property('model')
});