module.exports = {
    sendJoinUsEmail: function(req, res) {
        if(req.body) {
            EmailService.sendJoinUsEmail(req.body.email, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.type, req.body.year, req.body.interests, function(result) {
                if(result) {
                    res.ok();
                }
                else {
                    res.badRequest();
                }
            });
        }
        else {
            res.badRequest();                                 
        }
    }
}