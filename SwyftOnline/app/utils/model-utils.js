import config from 'swyft-online/config/environment';

export default {
    DeliveryNote: function() {
        this.commentedBy = null;
        this.deliveredBy = null;
        this.comments = "";
        this.isDelivered = false;
        this.deliveredAt = null; 
        this.cashPayment = null;
    }
}