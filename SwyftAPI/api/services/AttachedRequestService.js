module.exports = {
    processAttachedRequests: function(item, cb) {
        if(item.attachedRequests) {
            var requestIds = UtilityService.splitCSV(item.attachedRequests);
            var requestItems = [];
            async.each(requestIds, function(id, callback) {
                AttachedRequest.findOne({ id: id }).exec(function(err, request) {
                    requestItems.push(request);
                    callback();
                });
            }, function(err) {
                item.attachedRequests = requestItems;
                cb(item);
            });
        }
        else {
            cb(item);
        }
    }
}