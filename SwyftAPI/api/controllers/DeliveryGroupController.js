module.exports = {
    getDeliveryGroupMetadata: function(req, res) {
        MetaService.getDeliveryGroupMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getDeliveryGroupModel: function(req, res) {
        res.json(new ModelService.DeliveryGroup());
    }
}