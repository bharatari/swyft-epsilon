module.exports = {
    getGlobalDeliveryNote: function(req, res) {
        Global.findOne({ key:"globalDeliveryNote" }).exec(function(err, note) {
            res.json(note);
        });
    },
    setGlobalDeliveryNote: function(req, res) {
        Global.update({ key:"globalDeliveryNote" }, { value: req.body.note }).exec(function(err, note)  { 
            if(err) {
                return res.badRequest();
            }
            else {
                res.json(note);
            } 
        });
    },
    setDeliveryNoteComment: function(req, res) {
        Order.findOne({ id: req.body.orderId }).exec(function(err, order) {
            if(!order.deliveryNote) {
                order.deliveryNote = new ModelService.DeliveryNote(req.user.id, null, req.body.comments, null, null);
            }
            else {
                order.deliveryNote.commentedBy = req.user.id;
                order.deliveryNote.comments = req.body.comments;
            }
            Order.update({ id: order.id }, order).exec(function(err) {
                res.ok();
            });
        });
    },
    setDelivered: function(req, res) {
        Order.findOne({ id: req.body.orderId }).exec(function(err, order) {
            if(!order.deliveryNote) {
                order.deliveryNote = new ModelService.DeliveryNote(null, req.user.id, null, req.body.isDelivered, new Date());
            }
            else {
                order.deliveryNote.deliveredBy = req.user.id;
                order.deliveryNote.isDelivered = req.body.isDelivered;
                if(!req.body.isDelivered) {
                    order.deliveryNote.deliveredAt = null;
                }
                else {
                    order.deliveryNote.deliveredAt = new Date();
                }
            }
            Order.update({ id: order.id }, order).exec(function(err) {
                res.ok();
            });
        });
    }
}