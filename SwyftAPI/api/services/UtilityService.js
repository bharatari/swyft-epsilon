module.exports = {
    forLoop: function(items, process, final) {
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
                final(items);
            }
        }
        loop(0);
    }
}