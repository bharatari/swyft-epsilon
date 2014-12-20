module.exports = function(req, res, next){
    var token = req.body.token;
    if (token) {
        try {
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'));

            if (decoded.exp <= Date.now()) {
                return res.send(400, {message:'Access token has expired'});
            }
            else{
                User.findOne({ id: decoded.iss }, function(err, user) {
                    req.user = user;
                    next();
                });
            }

        } catch (err) {
            return res.send(403, {message:'Not Authorized'});
        }
    } else {
        return res.send(403, {message:'Not Authorized'});
    }

}
