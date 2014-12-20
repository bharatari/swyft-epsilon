import Ember from "ember";

export default Ember.Controller.extend({
    actions: {
        login: function(){
            $.post("/api/login", {username: this.get("username"), password: this.get("password"), _csrf: this.get("csrfToken")}, function(data, textStatus, jqXHR){
                console.log(data);
                if(data.verified==false){
                    location.assign('/app/verify');
                }
                else if(data.verified==true){
                    location.assign('/app/restaurants');
                }
            });
        }
    }
});