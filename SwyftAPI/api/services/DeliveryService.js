module.exports = {
    findLatest: function(deliveries, cb) {
        var latest = deliveries[0];
        for(var i = 0; i < deliveries.length; i++) {
            if(deliveries[i].deliveryDate > latest.deliveryDate) {
                latest = deliveries[i];
            }
        }
        cb(latest);
    }
}