/* global $ */
import Ember from "ember";

export default Ember.Component.extend({
    visibilityChanged: function() {
        if(this.get('searchVisible') === false) {
            this.set('value', "");
            $('#search-box').addClass('navbar-search-box-invisible').removeClass('navbar-search-box-visible');
        }
        else {
            if($('#search-box').hasClass('div-invisible')) {
                $('#search-box').addClass('navbar-search-box-visible').removeClass('div-invisible navbar-search-box-invisible');
            }
            else {
                $('#search-box').addClass('navbar-search-box-visible').removeClass('navbar-search-box-invisible');
            }
            $("#search-box").focus();
        }
    }.observes('searchVisible'),
    valueChanged: function() {
        if(this.get('searchVisible') === false) {
            this.set('value', "");
        }
    }.observes('value'),
    actions: {
        toggle: function() {
            if(this.get('searchVisible') === true) {
                this.set('searchVisible', false);
            }
            else {
                this.set('searchVisible', true);
            }
        }
    }
});