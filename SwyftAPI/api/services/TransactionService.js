module.exports = {
    iterateJoinUsers: function(items, callback) {
        function loop(i){
            if(i<items.length){
                function query(cb){
                    User.find().where({id:items[i].userId}).exec(function(err, user){
                        items[i].user=user[0];
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
    }
}