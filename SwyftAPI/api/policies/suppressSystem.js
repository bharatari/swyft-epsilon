module.exports = function(req, res, next) {
    if(SystemService.suppressSystem){
        res.forbidden();
    } 
    else {
        next();
    }
};
