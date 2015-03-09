module.exports = {
    MasterListItem: function(firstName, lastName, items, deliveryLocation, total, phoneNumber, paymentType, chargeLater) {
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
    }
}