var Chance = require('chance');
var chance = new Chance();
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('pTw4E8DYFKb696f5YzXmzg');

module.exports = {
    processForgotPasswordToken: function(user, date, cb) {
        ForgotPasswordToken.create({userId:user.id, token:chance.hash({length:25}), expiryDate:date, username:user.username.toLowerCase() }).exec(function(err, token) {
            if(err) {
                cb(false);
            }
            else {
                var message = {
                    "html":"<h1>Forgot your password?</h1><p>No worries. Just copy the following link into your web browser to reset your password: https://www.orderswyft.com/app/reset-password/"+token.token+". For security purposes, this link will expire in 24 hours. If you believe this email was sent to you in error, please let us know immediately.",
                    "subject":"Forgot Password",
                    "from_email":"swyftdeveloper@outlook.com",
                    "from_name":"Swyft",
                    "to":[{
                        "email": user.username,
                        "name": user.firstName + " " + user.lastName,
                        "type": "to"
                    }]
                };
                mandrill_client.messages.send({ "message" : message }, function(result){ 
                    cb(true);
                });
            }
        });
    },
    deleteSensitiveIterate: function(users) {
        if(users) {
            for(var i = 0; i < users.length; i++) {
                if(users[i]) {
                    delete users[i].password;
                    delete users[i].token;
                }
            }  
        }
        return users;
    },
    deleteSensitive: function(user) {
        if(user) {
            delete user.password;
            delete user.token;
        }
        return user;
    },
    /*
    getUsers: function(query, cb) {
        if(query.filters) {
            User.find().exec(function(err, items) {
                items = UtilityService.filterData(items, query.filters);
                if(query.page && query.sort && query.sortType) {
                    var data = UtilityService.sortData(items, query.sort, query.sortType);
                    cb(UtilityService.pagination(data, query.recordsPerPage, 1));
                }
                else if(query.page) {
                    cb(UtilityService.pagination(items, query.recordsPerPage, 1));
                }
                else if(query.sort) {
                    cb(UtilityService.sortData(items, query.sort, query.sortType));
                }
            });
        }
        else {
            if(query.page && query.sort && query.sortType) {
                User.find().exec(function(err, users) {
                    var data = UtilityService.sortData(users, query.sort, query.sortType);
                    cb(UtilityService.pagination(data, query.recordsPerPage, 1));
                });
            }
            else if(query.page) {
                User.find().paginate({page: query.page, limit: query.recordsPerPage}).exec(function(err, users) {
                    cb(users);
                });
            }
            else if(query.sort) {
                User.find().exec(function(err, users) {
                    cb(UtilityService.sortData(users, query.sort, query.sortType));
                });
            }
        }
    }   
    */
}