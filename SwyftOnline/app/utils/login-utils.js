import config from 'swyft-online/config/environment';

export default {
    localStorageKey: "currentSession-R32FSTF12YE43A3",
    checkLogin: function() {
        var key = this.localStorageKey;
        return new Ember.RSVP.Promise(function(resolve, reject){
            if(JSON.parse(localStorage.getItem(key))){
                var url = config.routeLocation + "/api/isAuthenticated";
                var data = {tokenId: JSON.parse(localStorage.getItem(key)).token.id};
                Ember.$.ajax({
                    url:         url,
                    data:        data,
                    success: function(response) {
                        resolve(true);
                    },
                    error: function(xhr, textStatus, error) {
                        //There's an irrelevant syntax error jQuery throws that has no effect on our request. We need to handle this.
                        if(xhr.responseText === "OK") {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }
                });
            }   
            else {
                reject(false);
            }
        });
    },
    logout: function(csrf) {
        var key = this.localStorageKey;
        return new Ember.RSVP.Promise(function(resolve, reject){
            if(JSON.parse(localStorage.getItem(key))) {
                var url = config.routeLocation + "/api/logout";
                var data = {data: JSON.parse(localStorage.getItem(key)), _csrf: csrf};
                Ember.$.ajax({
                    url:         url,
                    type:        'POST',
                    data:        JSON.stringify(data),
                    dataType:    'json',
                    headers: { 
                        Accept : "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    success: function(response) {
                        resolve(true);
                    },
                    error: function(xhr, textStatus, error) {
                        //There's an irrelevant syntax error jQuery throws that has no effect on our request. We need to handle this.
                        if(xhr.responseText === "OK") {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }
                });
            }
            else {
                reject(false);
            }
        });
    },
    isAdmin: function() {
        var key = this.localStorageKey;
        return new Ember.RSVP.Promise(function(resolve, reject){
            if(JSON.parse(localStorage.getItem(key))){
                var url = config.routeLocation + "/api/isAdmin";
                var data = {tokenId: JSON.parse(localStorage.getItem(key)).token.id};
                Ember.$.ajax({
                    url:         url,
                    data:        data,
                    success: function(response) {
                        resolve(true);
                    },
                    error: function(xhr, textStatus, error) {
                        //There's an irrelevant syntax error jQuery throws that has no effect on our request. We need to handle this.
                        if(xhr.responseText === "OK") {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }
                });
            }   
            else {
                reject(false);
            }
        });
    }
}