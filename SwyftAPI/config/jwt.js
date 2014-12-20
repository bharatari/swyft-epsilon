var jwt = require('jwt-simple');

module.exports = {
    express: {
        customMiddleware: function(app){
            app.set('jwtTokenSecret', 'm62i9ri75os974n3malodug52');
        }
    }
};