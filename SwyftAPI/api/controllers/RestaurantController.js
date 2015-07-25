module.exports = {
    getRestaurantMetadata: function(req, res) {
        MetaService.getRestaurantMetadata(req.query.limit, function(result) {
            res.json(result);
        });
    },
    getRestaurantModel: function(req, res) {
        res.json(new ModelService.Restaurant());
    }
}