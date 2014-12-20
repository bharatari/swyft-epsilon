module.exports = {
    processPricing: function(items) {
        for(var i = 0; i < items.length; i++){
            items[i].baseprice = items[i].baseprice*settings.productMarkup;
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
    }
}