module.exports = {
    getLocations: function(req, res) {
        DeliveryLocation.find({ disabled: false }).sort('name').exec(function(err, locations) {
            res.json(locations);
        });
    },
    getLocationsSimple: function(req, res) {
        DeliveryLocation.find({ disabled: false }).sort('name').exec(function(err, locations) {
            var array = [];
            for(var i = 0; i < locations.length; i++) {
                array.push(locations[i].name);
            }
            res.json(array);
        });
    },
    getLocationOrders: function(req, res) {
        Order.find({ deliveryId: req.body.delivery_id, deliveryLocation: req.body.deliveryLocation }).exec(function(err, items){
            if(err || !items) {
                res.serverError();
            }
            OrderService.getMasterList(items, function(result) {
                res.json(result);
            });
        });
    },
    getDeliveryLocationMetadata: function(req, res) {
        MetaService.getDeliveryLocationMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getDeliveryLocationModel: function(req, res) {
        res.json(new ModelService.DeliveryLocation());
    }
}