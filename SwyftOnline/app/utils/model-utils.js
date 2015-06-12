import config from 'swyft-online/config/environment';

export default {
    DeliveryNote: function() {
        this.commentedBy = null;
        this.deliveredBy = null;
        this.comments = "";
        this.isDelivered = false;
        this.deliveredAt = null; 
        this.cashPayment = null;
    },
    Transaction: function() {
        this.userId = "";
        this.type = "";
        this.amount = 0;
        this.comments = "";
        this.orderId = "";
        this.transactionCreator = "";
        this.finalBalance = 0;
    }
}