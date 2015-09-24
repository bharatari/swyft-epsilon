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
    },
    getFAQ: function(req, res) {
        Global.findOne({ key: "faq" }).exec(function(err, faq) {
            if(err || !faq) {
                return res.json([]);
            }
            else {
                return res.json(faq.value);
            }
        }); 
    },
    setFAQ: function(req, res) {
        if(req.body) {
            if(req.body.faq) {
                Global.update({ key: "faq" }, { value: req.body.faq }).exec(function(err) {
                    if(err) {
                        return res.badRequest();
                    }
                    else {
                        return res.ok();
                    }
                });
            }
            else {
                return res.badRequest();
            }
        }
        else {
            return res.badRequest();
        }
    },
    getTerms: function(req, res) {
        Global.findOne({ key: "terms" }).exec(function(err, terms) {
            if(err || !terms) {
                return res.json("");
            }
            else {
                return res.json(terms.value);
            }
        }); 
    },
    setTerms: function(req, res) {
        if(req.body) {
            if(req.body.terms) {
                Global.update({ key: "terms" }, { value: req.body.terms }).exec(function(err) {
                    if(err) {
                        return res.badRequest();
                    }
                    else {
                        return res.ok();
                    }
                });
            }
            else {
                return res.badRequest();
            }
        }
        else {
            return res.badRequest();
        }
    },
    getGlobalMetadata: function(req, res) {
        MetaService.getGlobalMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getGlobalModel: function(req, res) {
        res.json(new ModelService.Global());
    }
}