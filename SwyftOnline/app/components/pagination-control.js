import Ember from "ember";

export default Ember.Component.extend({
    didInitAttrs() {
        //This will also execute with 0 as a value, which is fine
        //because if 0 is passed in, we actually need to see 
        //what to do
        if(!this.get('currentPage')) {
            if(this.get('totalPages') > 0) {
                this.set('currentPage', 1);
            }
            else {
                this.set('currentPage', 0);
            }
        }
    },
    display: Ember.computed('totalPages', function() {
        if(this.get('totalPages') > 0) {
            return true;
        } 
        else {
            return false;
        }
    }),
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
                return previousFive.reverse();
            }
            else {
                previousFive.push(i);
            }
        }
        return previousFive.reverse();
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