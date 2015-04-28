module.exports = {
    forLoop: function(items, process, callback) {
        function loop(i){
            if(i<items.length){
                function query(cb){
                    process(items[i], function() {
                        cb();
                    });
                }
                query(function(){
                    loop(i+1);
                });
            }
            else{
                callback(items);
            }
        }
        loop(0);
    },
    indexOfByProperty: function(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    },
    indexOf: function(myArray, searchTerm) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i] === searchTerm) return i;
        }
        return -1;
    },
    splitCSV: function(csv) {
        return csv.split(", ");
    },
    protect: function (run, onError) {
        var domain = require('domain').create();
        domain.on('error', onError);
        domain.run(run);
    },
    sort: function(array, propertyString) {
        return array.sort(function(a,b) { 
            return new Date(a[propertyString]).getTime() - new Date(b[propertyString]).getTime() 
        });
    }
}