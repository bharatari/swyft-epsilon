module.exports = function(req, res, next) {
    if(req.user.disabled){
        res.forbidden();
    } 
    else {
        next();
    }
};
