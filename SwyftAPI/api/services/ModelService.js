module.exports = {
    /** Models for internal use **/
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
    DeliveryNote: function(commentedBy, delivererId, comments, isDelivered, deliveredAt, cashPayment, chargeLater) {
        this.commentedBy = commentedBy;
        this.deliveredBy = delivererId;
        this.comments = comments;
        this.isDelivered = isDelivered;
        this.deliveredAt = new Date();
        if(typeof chargeLater === 'undefined') {
            this.chargeLater = chargeLater;
        }
        else {
            this.chargeLater = false;
        }
        if (typeof cashPayment === 'undefined') { 
            this.cashPayment = null; 
        }
        else {
            this.cashPayment = cashPayment;
        }
    },
    /** Models for external use **/
    Transaction: function() {
        this.userId = "";
        this.type = "";
        this.amount = 0;
        this.comments = "";
        this.orderId = "";
        this.transactionCreator = "";
        this.finalBalance = 0;
    },
    User: function() {
        this.username = "";
        this.firstName = "";
        this.lastName = "";
        this.dormitory = "";
        this.postOfficeBox = "";
        this.phoneNumber = "";
        this.verified = false;
        this.token = "";
        this.balance = 0;
        this.contactConsent = true;
        this.isAdmin = false;
        this.isDriver = false;
        this.isEmployee = false;
        this.isDeliverer = false;
        this.isEnabled = false;
        this.testUser = false;
    },
    Global: function() {
        this.key = "";
        this.value = "";
    }
}