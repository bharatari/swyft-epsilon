module.exports = {
    deleteSensitiveSingle: function(item) {
        if(item.adminComments) {
            delete item.adminComments;
        }
        return item;
    },
    deleteSensitive: function(items) {
        for(var i = 0; i < items.length; i++) {
            if(items[i].adminComments) {
                delete items[i].adminComments;;
            }
        }
        return items;
    },
    processMenuItem: function(menuItem, cb) {
        if(menuItem.itemOptions) {
            for(var i = 0; i < menuItem.itemOptions.length; i++) {
                if(menuItem.itemOptions[i]) {
                    if(menuItem.itemOptions[i].options) {
                        for(var e = 0; e < menuItem.itemOptions[i].options.length; e++) {
                            if(menuItem.itemOptions[i].options[e]) {
                                if(typeof menuItem.itemOptions[i].options[e].price === 'string') {
                                    menuItem.itemOptions[i].options[e].price = parseFloat(menuItem.itemOptions[i].options[e].price);
                                }
                            }
                        }
                        
                    }   
                }
            }
        }
        if(menuItem.extras) {
            for(var i = 0; i < menuItem.extras.length; i++) {
                if(menuItem.extras[i]) {
                    if(typeof menuItem.extras[i].price === 'string') {
                        menuItem.extras[i].price = parseFloat(menuItem.extras[i].price);                        
                    }
                }
            }
        }
        cb(menuItem);
    },
    /** HARDCODE **/
    /* Please refer to the README to learn more about SwyftAPI flags */
    processItemComments: function(item, cb) {
        item.itemComments = "";
        if(item.additionalRequests) {
            item.itemComments += "Requests: " + item.additionalRequests + ", ";
        }
        if(item.options) {
            async.each(item.options, function(option, callback) {
                if(option.category === "Meal") {
                    if(option.name !== "No Meal") {
                        item.itemComments += option.name + ", ";
                    }
                }
                if(option.category === "Size") {
                    item.itemComments += option.name + ", ";
                }
                callback();
            }, function(err) {
                if(item.itemComments) {
                    if(item.itemComments.length > 0) {
                        item.itemComments = item.itemComments.substring(0, item.itemComments.length - 2);
                    }
                }
                cb(item);
            });
        }
        else {
            if(item.itemComments) {
                if(item.itemComments.length > 0) {
                    item.itemComments = item.itemComments.substring(0, item.itemComments.length - 2);
                }
            }
            cb(item);
        }
    },
    processItemCommentsFull: function(data, cb) {
        async.each(data.items, function(item, callback) {
            var options = "";
            for (var property in item.options) {
                if (item.options.hasOwnProperty(property)) {
                    options += item.options[property].name + ", ";
                }
            }
            if(item.standardOptions) {
                for(var z = 0; z < item.standardOptions.length; z++){
                    if(item.standardOptions[z].isSelected){
                        options += item.standardOptions[z].name + ", ";
                    }
                }
            }
            if(item.extras) {
                for(var property in item.extras){
                    if(item.extras.hasOwnProperty(property)){
                        options += item.extras[property].name + ", ";
                    }
                }
            }
            options = options.substring(0, options.length-2);
            item.itemOptions = options;
            callback();
        }, function(err) {
            cb(data);
        });        
    }
}
