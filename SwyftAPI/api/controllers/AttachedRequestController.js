module.exports = {
  update: function (req, res) {
    if (req.body) {
      AttachedRequestService.processAttachedRequest(req.body, function (result) {
        AttachedRequest.update({
          id: req.body.id
        }, result).exec(function (err, attachedRequest) {
          res.ok();
        });
      });
    } else {
      res.badRequest();
    }
  },
  getAttachedRequestMetadata: function (req, res) {
    MetaService.getAttachedRequestMetadata(req.query.limit, req.query.where, function (result) {
      res.json(result);
    });
  },
  getAttachedRequestModel: function (req, res) {
    res.json(new ModelService.AttachedRequest());
  }
};
