module.exports = function(req, res, next){
  if(req.isAuthenticated()){
    User.findOne({id:req.user.id}).exec(function(err, user){
        if(user.isAdmin){
            next();
        }
        else{
            res.send(403, {message:'Not Authorized'});
        }
    });
  }
  else{
    return res.send(403, {message:'Not Authorized'});
  }
}
