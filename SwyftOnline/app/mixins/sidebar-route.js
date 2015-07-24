import Ember from "ember";

/*
    This mixin allows for bug fixes to be applied to pages that either have a sidebar or can be linked to from a sidebar.
    Changes here should be purely correctionary, and shouldn't outwardly modify anything on a page.
*/

export default Ember.Mixin.create({
    setupController: function(controller, model) {
        this._super(controller, model)
        /* FIX FOR JASNY BOOTSTRAP SIDEBAR */
        $(".ember-application").css('overflow', 'auto');
    }
});