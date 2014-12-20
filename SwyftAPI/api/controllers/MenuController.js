var settings=sails.config.settings;

module.exports={
    restaurants: function(req, res){
        Restaurant.find({unavailable:false}).exec(function(err, restaurants){
            res.json(restaurants);
        });
    },
    menuItems: function(req, res){
        MenuItem.find({restaurant:req.params.restaurant_name}).exec(function(err, items){
            res.json(PriceService.processPricing(items));
        });
    },
    fullMenu:function(req,res){
        MenuItem.find({unavailable:false}).exec(function(err, items){
            res.json(PriceService.processPricing(items));
        });    
    }
}
