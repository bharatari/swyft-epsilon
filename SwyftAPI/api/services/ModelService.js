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
    DeliveryNote: function(commentedBy, delivererId, comments, isDelivered, deliveredAt, cashPayment, chargeLater, creditCardCharged, creditCardMessage) {
        this.commentedBy = commentedBy;
        this.deliveredBy = delivererId;
        this.comments = comments;
        this.isDelivered = isDelivered;
        this.deliveredAt = deliveredAt;
        if (typeof cashPayment === 'undefined') { 
            this.cashPayment = null; 
        }
        else {
            this.cashPayment = cashPayment;
        }
        if(typeof chargeLater === 'undefined') {
            this.chargeLater = chargeLater;
        }
        else {
            this.chargeLater = false;
        }
        if (typeof creditCardCharged === 'undefined') {
            this.creditCardCharged = false;
        }
        else {
            this.creditCardCharged = creditCardCharged;
        }
        if (typeof creditCardMessage === 'undefined') {
            this.creditCardMessage = "";
        }
        else {
            this.creditCardMessage = creditCardMessage;
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
        this.phoneNumber = "";
        this.verified = false;
        this.token = "";
        this.balance = 0;
        this.contactConsent = true;
        this.roles = "";
        this.adminComments = "";
        this.disabled = false;
    },
    Global: function() {
        this.key = "";
        this.value = "";
    },
    Coupon: function() {
        this.name = "";
        this.comemnts = "";
        this.isActive = false;
        this.discount = 0.0;
        this.code = "";
    },
    Token: function() {
        this.token = "";
        this.discount = 0.0;
        this.comments = "";
        this.hasBeenUsed = false;
        this.usedBy = "";
        this.orderId = "";
    },
    Delivery: function() {
        this.deliverers = "";
        this.comments = "";
        this.deliveryDate = new Date();
        this.deliveryPeriod = "";
        this.restaurants = "All";
        this.autoDelivery = false;
        this.orderCutoff = new Date();
        //this.fulfillment = [];
        this.closed = false;
        this.adminClosed = false;
    },
    DeliveryLocation: function() {
        this.name = "";
        this.group = "";
        //this.latitude = 0.0;
        //this.longitude = 0.0;
        this.disabled = false;
    },
    Restaurant: function() {
        this.name = "";
        this.title = "";
        this.unavailable = false;
        this.aggregateStyle = "";
        this.notice = "";
        this.image = "";
        this.subtitle = "";
    },
    MenuItem: function() {
        this.name = "";
        this.baseprice = 0.0;
        this.category = "";
        this.description = "";
        this.itemOptions = [];
        this.extras = [];
        this.attachedRequests = "";
        this.unavailable = false;
        this.restaurant = "";
        this.adminComments = "";
        this.note = "";
        this.seasonal = false;
        this.temporary = false;
    },
    Order: function() {
        this.type = "";
        this.items = [];
        this.userId = "";
        this.contactPhone = "";
        this.adminComments = "";
        this.totalAmount = 0.0;
        this.actualAmount = 0.0;
        this.paymentType = "";
        this.deliveryTime = new Date();
        this.deliveryId = "";
        this.deliveryLocation = "";
        this.couponId = "";
        this.tokenId = "";
        this.deliveryNote = new ModelService.DeliveryNote(null, null, null, null, null, null, null, null, null);
        this.isDeleted = false;
    },
    DeliveryPeriod: function() {
        this.deliveryDay = "";
        this.deliveryHour = 0.0;
        this.deliveryMinute = 0.0;
        this.deliverySecond = 0.0;
        this.cutoffDay = "";
        this.cutoffHour = 0.0;
        this.cutoffMinute = 0.0;
        this.cutoffSecond = 0.0;
        this.restaurants = "All";
        this.deliverers = "";
        this.enabled = false;   
    },
    AttachedRequest: function() {
        this.name = "";
        this.label = "";
        this.options = [];
        this.available = "";
        this.watches = "";
        this.on = "";
        this.required = false;
    },
    DeliveryGroup: function() {
        this.name = "";
        this.codename = ""; 
    }
}