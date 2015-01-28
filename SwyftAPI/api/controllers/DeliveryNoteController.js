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
    }
}