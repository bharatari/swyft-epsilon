module.exports = {
    MasterListItem: function(firstName, lastName, items, deliveryLocation, total, phoneNumber, paymentType, chargeLater, deliveryNote) {
        this.name = firstName.toUpperCase() + " " + lastName.toUpperCase();
        this.deliveryLocation = deliveryLocation.toUpperCase();
        this.total = total;
        this.phoneNumber = phoneNumber;
        this.paymentType = paymentType.toUpperCase();
        if(chargeLater === true) {
            this.charge = "CHARGE LATER";
        }
        else {
            this.charge = "STANDARD CHARGE";
        }
        this.items = items;
        this.deliveryNote = deliveryNote;
    },
    Delivery: function(date, id, restaurants, cutoff, deliverers) {
        this.deliveryPeriod = id;
        this.deliveryDate = date;
        this.restaurants = restaurants;
        this.orderCutoff = cutoff;
        this.deliverers = deliverers;
        this.closed = false;
        this.adminClosed = false;
        this.autoDelivery = true;
    },
    DeliveryNote: function(commentedBy, delivererId, comments, isDelivered, deliveredAt, cashPayment) {
        this.commentedBy = commentedBy;
        this.deliveredBy = delivererId;
        this.comments = comments;
        this.isDelivered = isDelivered;
        this.deliveredAt = new Date();
        if (typeof cashPayment === 'undefined') { 
            this.cashPayment = null; 
        }
        else {
            this.cashPayment = cashPayment;
        }
    }
}