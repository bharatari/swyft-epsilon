import Ember from "ember";

export default Ember.Component.extend({
    hasLastPage: function() {
        if(this.get('totalPages') < 2) {
            return false;
        }
        else {
            return true;
        }
    }.property('totalPages'),
    onLastPage: function() {
        if(this.get('currentPage') === this.get('totalPages')) {
            return true;
        }
        else {
            return false;
        }
    }.property('currentPage', 'totalPages'),
    onFirstPage: function() {
        if(this.get('currentPage') === 1) {
            return true;
        }
        else {
            return false;
        }
    }.property('currentPage'),
    pages: function() {
        var totalPages = this.get('totalPages');
        var pages = [];
        for(var i = 1; i <= totalPages; i++) {
            pages.push(i);
        } 
    }.property('totalPages'),
    previousFive: function() {
        var previousFive = [];
        for(var i = this.get('currentPage') - 1; i > this.get('currentPage') - 6; i--) {
            if(i < 2) {
                return previousFive;
            }
            else {
                previousFive.push(i);
            }
        }
        return previousFive;
    }.property('totalPages', 'currentPage'),
    nextFive: function() {
        var nextFive = [];
        for(var i = this.get('currentPage') + 1; i < this.get('currentPage') + 6; i++) {
            if(i >= this.get('totalPages')) {
                return nextFive;
            }
            else {
                nextFive.push(i);
            }
        }
        return nextFive;
    }.property('totalPages', 'currentPage'),
    actions: {
        goToPage: function(page) {
            this.set('currentPage', page);
        },
        goToLastPage: function() {
            this.set('currentPage', this.get('totalPages'));
        },
        goToFirstPage: function() {
            this.set('currentPage', 1);
        }
    }
});