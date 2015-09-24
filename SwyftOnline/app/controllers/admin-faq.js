/* global _ */
/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    currentRoute: 'admin-faq',
    actions: {
        addQuestion: function() {
            var faq = _.clone(this.get('faq'), true);
            faq.push({
                "question": "",
                "answer": ""
            });
            this.set('faq', faq);
        },
        deleteQuestion: function(question) {
            var faq = _.clone(this.get('faq'), true);
            faq = _.remove(faq, function(n) {
                return !_.isEqual(question, n);
            });
            this.set('faq', faq);
        },
        submit: function() {
            var self = this;
            var data = {
                faq: this.get('faq'),
                _user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            };
            var url = config.routeLocation + "/api/faq";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'FAQ Updated');
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