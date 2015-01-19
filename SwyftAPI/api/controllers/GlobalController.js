module.exports = {
    getNews: function(req, res) {
        Global.findOne({key: "news"}).exec(function(err, news){
            if(err || !news) {
                return res.json("");
            }
            else {
                return res.json(news.value);
            }
        });   
    }
}