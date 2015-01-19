module.exports={
    restaurants: function(req, res){
        Restaurant.find({unavailable:false}).exec(function(err, restaurants){
            res.json(restaurants);
        });
    },
    menuItems: function(req, res){
        MenuItem.find({restaurant:req.params.restaurant_name, unavailable:false}).exec(function(err, items){
            res.json(PriceService.processPricing(items));
        });
    },
    fullMenu:function(req,res){
        MenuItem.find({unavailable:false}).exec(function(err, items){
            res.json(PriceService.processPricing(items));
        });    
    },
    item:function(req,res){
        MenuItem.find({id:req.params.item_id}).exec(function(err, items){
            res.json(PriceService.processPricing(items));
        });
    }
}
