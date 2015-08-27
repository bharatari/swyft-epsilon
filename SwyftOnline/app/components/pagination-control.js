import Ember from "ember";

export default Ember.Component.extend({
    didInitAttrs() {
        if(!this.get('currentPage')) {
            this.set('currentPage', 1);
        }
    },
    onLastPage: Ember.computed('totalPages', 'currentPage', function() {
        if(this.get('currentPage') === this.get('totalPages')) {
            return true;
        }
        else {
            return false;
        }
    }),
    onFirstPage: Ember.computed('currentPage', function() {
        if(this.get('currentPage') === 1) {
            return true;
        }
        else {
            return false;
        }
    }),
    pages: Ember.computed('totalPages', function() {
        var totalPages = this.get('totalPages');
        var pages = [];
        for(var i = 1; i <= totalPages; i++) {
            pages.push(i);
        } 
    }),
    previousFive: Ember.computed('totalPages', 'currentPage', function() {
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
    }),
    nextFive: Ember.computed('totalPages', 'currentPage', function() {
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
    }),
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