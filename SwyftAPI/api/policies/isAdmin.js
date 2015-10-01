module.exports = function(req, res, next) {
    var tokenId, token;
    if(req.body) {
        if(req.body._user) {
            tokenId = req.body._user.token.id;
            token = req.body._user.token.token;
        }
        else if(req.body.user) {
            tokenId = req.body.user.token.id;
            token = req.body.user.token.token;
        }
    }
    else if(req.query) {
        tokenId = req.query.tokenId;
        token = req.query.token;
    }
    AuthService.isAdmin(tokenId, req.session, function(response) {
        if(response) {
            var user = AuthService.getUser(token, function(user) {
                if(user) {
                    req.user = user;
                    next();
                }   
                else {
                    return res.forbidden();
                }
            }); 
        }
        else {
            return res.forbidden();
        }
    });
}
