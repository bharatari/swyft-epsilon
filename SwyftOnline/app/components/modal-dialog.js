import Ember from "ember";

export default Ember.Component.extend({
    displayModalChanged: function() {
        if(this.get('displayModal')) {
            $('.modal').modal('show');
        }
        else {
            $('.modal').modal('hide');
        }
    }.observes('displayModal').on('didInsertElement'),
    actions: {
        close: function() {
            this.set('displayModal', false);
        }
    }
});