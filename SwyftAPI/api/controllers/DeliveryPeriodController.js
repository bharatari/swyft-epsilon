module.exports = {
  getDeliveryPeriodMetadata: function (req, res) {
    MetaService.getDeliveryPeriodMetadata(req.query.limit, req.query.where, function (result) {
      res.json(result);
    });
  },
  getDeliveryPeriodModel: function (req, res) {
    res.json(new ModelService.DeliveryPeriod());
  }
}
