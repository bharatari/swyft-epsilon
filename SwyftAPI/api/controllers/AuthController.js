var bcrypt = require('bcrypt');

module.exports={
    login: function(req, res){
        User.findOne({ username: req.body.username }, function(err, user) {
            if (err) {
                return done(null, err);
            }

            if (!user) {
                return done(null, false, { message: 'Invalid Username.' });
            }

            bcrypt.compare(req.body.password, user.password, function(err, res) {
                if (!res){
                    return done(null, false, { message: 'Invalid Password. '});
                }
                else if(err){
                    return done(null, false, { message: 'Unknown error. '});
                }
                var expires = moment().add('days', 2).valueOf();
                var token = jwt.encode({
                    iss: user.id,
                    exp: expires
                }, app.get('jwtTokenSecret'));

                res.json({
                    token : token,
                    expires: expires,
                    user: user.toJSON()
                });
            });
        });
    },
    logout:function(req,res){
        
    },
    isAuthenticated:function(req,res){
        
    }
}