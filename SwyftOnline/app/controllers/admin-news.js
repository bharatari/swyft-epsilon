/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    currentRoute: 'admin-news',
    actions: {
        submit: function() {
            var self = this;
            var data = {
                news: this.get('news'),
                _user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            };
            var url = config.routeLocation + "/api/news";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'News Updated');
                    self.set('modalBody', 'Your request has been processed.');
                    self.set('displayModal', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your request.');
                    self.set('displayModal', true);
                }
            });
        }
    }
});