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
    },
    /** For Admin CRUD **/
    processAttachedRequest: function(attachedRequest, cb) {
        if(attachedRequest.options) {
            for(var i = 0; i < attachedRequest.options.length; i++) {
                if(attachedRequest.options[i]) {
                    if(attachedRequest.options[i].price) {
                        if(typeof attachedRequest.options[i].price === 'string') {
                            attachedRequest.options[i].price = parseFloat(attachedRequest.options[i].price);
                        }
                    }
                }
            }
        }
        cb(attachedRequest);
    },
}