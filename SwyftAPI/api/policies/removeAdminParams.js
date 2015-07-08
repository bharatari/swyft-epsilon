module.exports = function(req, res, next) {
    if(req.query.token) {
        delete req.query.token;
    }
    if(req.query.tokenId) {
        delete req.query.tokenId;
    }
    if(req.body) {
        if(req.body.user) {
            delete req.body.user;
        }
    }
    next();
}
