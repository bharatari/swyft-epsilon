module.exports = {
    productMarkup: 1.2,
    tax: 1.09,
    processPricing: function(items) {
        for(var i = 0; i < items.length; i++){
            items[i].baseprice = items[i].baseprice*this.productMarkup;
            items[i].baseprice=Math.round(10*items[i].baseprice)/10;
            if(items[i].small){
                items[i].small=Math.round(10*items[i].small)/10;
            }
            if(items[i].medium){
                items[i].medium=Math.round(10*items[i].medium)/10;
            }
            if(items[i].large){
                items[i].large=Math.round(10*items[i].large)/10;
            }
        }
        return items;
    },
    processTax: function(order) {
        order.totalAmount = Math.round((order.totalAmount * this.tax)*10)/10;
        order.totalAmount = Math.round(order.totalAmount*10)/10;
        return order;
    }
}