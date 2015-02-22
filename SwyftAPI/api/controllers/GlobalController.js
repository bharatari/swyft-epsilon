module.exports = {
    getNews: function(req, res) {
        Global.findOne({ key: "news" }).exec(function(err, news){
            if(err || !news) {
                return res.json("");
            }
            else {
                return res.json(news.value);
            }
        });   
    },
    setNews: function(req, res) {
        Global.update({ key: "news" }, { value: req.body.news }).exec(function(err) {
            if(err) {
                return res.badRequest();
            }
            else {
                return res.ok();
            }
        });
    }
}