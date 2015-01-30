module.exports = {
    deleteSensitive: function(items) {
        for(var i = 0; i < items.length; i++) {
            delete items[i].adminComments;
        }
        return items;
    }
}