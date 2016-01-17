module.exports = {
  update: function (req, res) {
    if (req.body) {
      MenuItemService.processMenuItem(req.body, function (result) {
        MenuItem.update({
          id: req.body.id
        }, result).exec(function (err, menuItem) {
          res.ok();
        });
      });
    } else {
      res.badRequest();
    }
  },
  getMenuItemMetadata: function (req, res) {
    MetaService.getMenuItemMetadata(req.query.limit, req.query.where, function (result) {
      res.json(result);
    });
  },
  getMenuItemModel: function (req, res) {
    res.json(new ModelService.MenuItem());
  }
}