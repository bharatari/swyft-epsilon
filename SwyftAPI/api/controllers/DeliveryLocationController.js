module.exports = {
    getLocations: function(req, res) {
        DeliveryLocation.find({ disabled: false }).exec(function(err, locations) {
            res.json(locations);
        });
    }
}