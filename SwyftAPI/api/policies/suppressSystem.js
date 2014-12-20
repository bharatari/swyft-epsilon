module.exports = function(req, res, next) {
    System.find().exec(function(err, system){
        if(system[0].suppressSystem===true){
            return res.forbidden('The system is currently down for maintenance.');
        }
        else{
            next();
        }
    });
};
