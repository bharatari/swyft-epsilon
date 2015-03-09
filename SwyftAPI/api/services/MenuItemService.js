module.exports = {
    deleteSensitive: function(items) {
        for(var i = 0; i < items.length; i++) {
            delete items[i].adminComments;
        }
        return items;
    },
    /** HARDCODE **/
    /* Please refer to the README to learn more about SwyftAPI flags */
    processItemComments: function(item, cb) {
        item.itemComments = "";
        if(item.additionalRequests) {
            item.itemComments += "Requests: " + item.additionalRequests + ", ";
        }
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
            if(item.itemComments.length > 0) {
                item.itemComments = item.itemComments.substring(0, item.itemComments.length - 2);
            }
            cb(item);
        });
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