var Chance = require('chance');
var chance = new Chance();

module.exports = {
    checkToken: function(req, res) {
        Token.findOne({ token: req.params.token }).exec(function(err, token) {
            if(!token) {
                return res.badRequest();
            }
            else if(token.hasBeenUsed) {
                return res.badRequest();
            }
            else {
                return res.ok();
            }
        });
    },
    getOpenTokens: function(req, res) {
        Token.find({ hasBeenUsed: false }).exec(function(err, tokens) {
            res.json(tokens);
        });
    },
    createIndependentToken: function(req, res) {
        var data = {
            token: chance.guid(),
            discount: req.body.discount,
            comments: req.body.comments,
            hasBeenUsed: false
        }
        Token.create(data).exec(function(err, token) {
            if(err) {
                return res.badRequest();
            }
            else {
                res.json(token);
            }
        });
    },
    getToken: function(req, res) {
        Token.findOne({ token: req.params.token }).exec(function(err, token) {
            if(err || !token) {
                res.badRequest();
            }
            else {
                res.json(token);
            } 
        });
    }
}