module.exports = function(req, res, next){
    var tokenId = (req.body) ? req.body.user.token.id : req.query.tokenId;
    var token = (req.body) ? req.body.user.token.token : req.query.token;
    AuthService.authenticated(tokenId, req.session, function(response) {
        if(response) {
            var user = AuthService.getUser(token, function(user){
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
