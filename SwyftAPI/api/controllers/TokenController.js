module.exports = {
    getTokenMetadata: function(req, res) {
        MetaService.getTokenMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getTokenModel: function(req, res) {
        res.json(new ModelService.Token());
    }
}