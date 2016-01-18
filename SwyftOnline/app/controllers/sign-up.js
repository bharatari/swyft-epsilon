/* jslint unused: false */
/* global $, fbq, mixpanel */
/* jslint eqeqeq: true */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Controller.extend({
    error: false,
    actions: {
        closeError: function() {
            this.set('error', false);
        },
        validatePassword: function() {
            var password = this.get('password');
            var confirmPassword = this.get('confirmPassword');
            if(password && confirmPassword) {
                if(password !== confirmPassword) {
                    Ember.$('#confirmPassword').css('background-color', 'red');
                }
                else {
                    Ember.$('#confirmPassword').css('background-color', 'white');
                }
            }
        },
        signUp: function() {
            this.set('buttonPressed', true);
            var password1 = $("#password").val();
            var password2 = $("#confirmPassword").val();
            var self = this;
            if(password1 == password2) {
                if(password1.length >= 6 && password1.length <= 20) {
                    var data = {
                        firstName: this.get('firstName'),
                        lastName: this.get('lastName'),
                        dormitory: this.get('dormitory'),
                        phoneNumber: this.get('phoneNumber'),
                        username: this.get('username'),
                        contactConsent: this.get('contactConsent'),
                        password: password1
                    };
                    for (var property in data) {
                        if (data.hasOwnProperty(property)) {
                            if(!data[property] && property != "contactConsent"){
                                this.set('error', true);
                                this.set('buttonPressed', false);
                                return;
                            }
                        }
                    }
                    Ember.run(function() {
                        Ember.$.ajax({
                            url: config.routeLocation + "/api/user",
                            data: JSON.stringify(data),
                            headers: {
                                Accept : "application/json; charset=utf-8",
                                "Content-Type": "application/json; charset=utf-8"
                            },
                            type: "POST",
                            success: function(response) {
                                self.set('modalTitle', 'Email Verification');
                                self.set('modalBody', 'We sent you an email to verify your account. Be sure to check your spam folder as well.');
                                self.set('displayModal', true);
                                fbq('track', 'CompleteRegistration');
                            },
                            error: function(xhr, textStatus, error) {
                                if (xhr.responseText === "EMAIL_IN_USE"){
                                    self.set('modalTitle', 'Email already in use');
                                    self.set('modalBody', 'That email seems to be already in use. If you forgot your password and are trying to gain access to your account, use the Forgot Password link on the login page.');
                                    self.set('displayModal', true);
                                    mixpanel.track("Sign Up Error", { "request": data, "response": xhr, "type": "EMAIL_IN_USE" });
                                } else {
                                    self.set('modalTitle', 'Whoops.');
                                    self.set('modalBody', "Something went wrong with your sign up request. Check that you've filled out all fields and followed our password requirements. Contact us if you have any further questions.");
                                    self.set('displayModal', true);
                                    mixpanel.track("Sign Up Error", { "request": data, "response": xhr });
                                }
                                self.set('buttonPressed', false);
                            }
                        });
                    });
                }
                else {
                    this.set('error', true);
                    this.set('buttonPressed', false);
                }
            }
            else{
                this.set('error', true);
                this.set('buttonPressed', false);
            }
        }
    }
});
