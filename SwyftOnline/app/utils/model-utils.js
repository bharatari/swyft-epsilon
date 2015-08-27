import config from 'swyft-epsilon-online/config/environment';

export default {
    DeliveryNote: function() {
        this.commentedBy = null;
        this.deliveredBy = null;
        this.comments = "";
        this.isDelivered = false;
        this.deliveredAt = null; 
        this.cashPayment = null;
        this.chargeLater = false;
        this.creditCardCharged = false;
        this.creditCardMessage = "";
    },
    Transaction: function() {
        this.userId = "";
        this.type = "";
        this.amount = 0;
        this.comments = "";
        this.orderId = "";
        this.transactionCreator = "";
        this.finalBalance = 0;
    },
    transitionToData: function(data, metadata) {
        for(var i = 0; i < metadata.properties.length; i++) {
            if(metadata.properties[i].editable) {
                Ember.set(data, metadata.properties[i].propertyName, metadata.properties[i].value);
            }
        }
        return data;
    },
    transitionToMeta: function(data, metadata) {
        for(var i = 0; i < metadata.properties.length; i++) {
            metadata.properties[i].value = Ember.get(data, metadata.properties[i].propertyName);
        }
        return metadata;
    },
    dynamicProperty: function(data, propertyName) {
        if(data && propertyName) {
            if(propertyName.indexOf('.') !== -1)
            {
                var array = propertyName.split(".");
                var value = data;
                for(var i = 0; i < array.length; i++) {
                    if(value[array[i]]) {
                        value = value[array[i]]
                    }
                }
                return value;
            }
            else {
                return data[propertyName];
            }
        }
    }
}